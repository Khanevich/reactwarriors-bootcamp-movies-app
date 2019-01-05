import React from "react";
import CallApi from "../../../api/api";
import Field from "./Field/Field";
import AppContextHOC from "../../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ loginFormStore }) => ({
  loginFormStore
}))
@observer
class LoginForm extends React.Component {
  // onSubmit = () => {
  //   this.props.onChangeSubmitting(true);
  //   CallApi.get("/authentication/token/new")
  //     .then(data => {
  //       return CallApi.post("/authentication/token/validate_with_login", {
  //         body: {
  //           username: this.props.values.username,
  //           password: this.props.values.password,
  //           request_token: data.request_token
  //         }
  //       });
  //     })
  //     .then(data => {
  //       return CallApi.post("/authentication/session/new", {
  //         body: {
  //           request_token: data.request_token
  //         }
  //       });
  //     })
  //     .then(data => {
  //       this.props.updateSessionId(data.session_id);
  //       return CallApi.get("/account", {
  //         params: {
  //           session_id: data.session_id
  //         }
  //       });
  //     })
  //     .then(user => {
  //       this.props.updateUser(user);
  //       this.props.onChangeSubmitting(false);
  //       this.props.toggleModal();
  //     })
  //     .catch(error => {
  //       console.log("error", error);
  //       // this.setState({
  //       //   submitting: false,
  //       //   errors: {
  //       //     base: error.status_message
  //       //   }
  //       // });
  //       // this.props.submitting = false;
  //       this.props.onChangeSubmitting(false);
  //       this.props.errors.base = error.status_message;
  //     });
  // };

  onLogin = event => {
    event.preventDefault();

    const errors = this.props.loginFormStore.validateFields();
    if (Object.keys(errors).length > 0) {
      // this.setState(prevState => ({
      //   errors: {
      //     ...prevState.errors,
      //     ...errors
      //   }
      // }));
      // this.props.errors = errors;
      this.props.loginFormStore.onChangeErrors(errors);
    } else {
      this.props.loginFormStore.onSubmit();
    }
  };

  render() {
    const {
      values,
      errors,
      submitting,
      onChangeInfo,
      handleBlur
    } = this.props.loginFormStore;
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
            value={values.username || ""}
            onChange={onChangeInfo}
            onBlur={handleBlur}
            error={errors.username}
          />
          <Field
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            name="password"
            value={values.password || ""}
            onChange={onChangeInfo}
            onBlur={handleBlur}
            error={errors.password}
          />
          <Field
            type="password"
            className="form-control"
            id="repeatPassword"
            placeholder="Repeat password"
            name="repeatPassword"
            value={values.repeatPassword || ""}
            onChange={onChangeInfo}
            onBlur={handleBlur}
            error={errors.repeatPassword}
          />
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.props.onLogin}
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
