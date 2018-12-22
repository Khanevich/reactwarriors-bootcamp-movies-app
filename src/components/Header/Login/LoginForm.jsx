import React from "react";
import CallApi from "../../../api/api";
import Field from "./Field/Field";
import AppContextHOC from "../../HOC/AppContextHOC";

class LoginForm extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   username: "",
    //   password: "",
    //   repeatPassword: "",
    //   errors: {
    //     username: false,
    //     password: false,
    //     repeatPassword: false,
    //     base: false
    //   },
    //   submitting: false
    // };
  }

  onChangeInfo = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null,
        base: null
      }
    }));
  };

  handleBlur = () => {
    console.log("on blur");
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: {
          ...this.state.errors,
          ...errors
        }
      });
    }
  };

  validateFields = event => {
    const { username, password, repeatPassword } = this.state;
    const errors = {};
    if (username !== null && username.length < 5) {
      errors.username = "Username is too short";
    }

    if (password !== null && password.length < 5) {
      errors.password = "Password is too short";
    }
    if (repeatPassword !== null && repeatPassword !== password) {
      errors.repeatPassword = "Passwords must be the same";
    }
    return errors;
  };

  onSubmit = () => {
    this.setState({
      submitting: true
    });
    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        this.props.updateUser(user);
        this.setState({
          submitting: false
        });
        this.props.toggleModal();
        console.log(user);
      })
      .catch(error => {
        console.log("error", error);
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  onLogin = event => {
    event.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      this.onSubmit();
    }
  };

  render() {
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitting
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <Field
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your name"
            name="username"
            value={username || ""}
            onChange={this.onChangeInfo}
            onBlur={this.handleBlur}
            error={errors.username}
          />
          <Field
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            name="password"
            value={password || ""}
            onChange={this.onChangeInfo}
            onBlur={this.handleBlur}
            error={errors.password}
          />
          <Field
            type="password"
            className="form-control"
            id="repeatPassword"
            placeholder="Repeat password"
            name="repeatPassword"
            value={repeatPassword || ""}
            onChange={this.onChangeInfo}
            onBlur={this.handleBlur}
            error={errors.repeatPassword}
          />
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

export default AppContextHOC(LoginForm);
