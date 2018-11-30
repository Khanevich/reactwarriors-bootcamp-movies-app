import React from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../../api/api";
import Field from "./Field/Field";
import AppContextHOC from "../../HOC/AppContextHOC";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "StasKhanevich",
      password: "terka2312",
      repeatPassword: "terka2312",
      errors: {
        username: false,
        password: false,
        repeatPassword: false,
        base: false
      },
      submitting: false
    };
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

  // onSubmit = async () => {
  //   const fetchApi = (url, options = {}) => {
  //     return new Promise((resolve, reject) => {
  //       fetch(url, options)
  //         .then(response => {
  //           if (response.status < 400) {
  //             return response.json();
  //           } else {
  //             throw response;
  //           }
  //         })
  //         .then(data => {
  //           resolve(data);
  //         })
  //         .catch(response => {
  //           response.json().then(error => {
  //             reject(error);
  //           });
  //         });
  //     });
  //   };
  //
  //   try {
  //     this.setState({
  //       submitting: true
  //     });
  //     const data = await fetchApi(
  //       `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
  //     );
  //
  //     const result = await fetchApi(
  //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           username: this.state.username,
  //           password: this.state.password,
  //           request_token: data.request_token
  //         })
  //       }
  //     );
  //
  //     const { session_id } = await fetchApi(
  //       `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           request_token: result.request_token
  //         })
  //       }
  //     );
  //     this.props.updateSessionId(session_id);
  //     const user = await fetchApi(
  //       `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
  //     );
  //     this.props.updateUser(user);
  //     this.setState({
  //       submitting: false
  //     });
  //   } catch (error) {
  //     this.setState({
  //       submitting: false,
  //       errors: {
  //         base: error.status_message
  //       }
  //     });
  //     console.log("error", error);
  //   }
  // };

  onSubmit = () => {
    this.setState({
      submitting: true
    });
    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
            data.session_id
          }`
        );
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

// const LoginFormContainer = props => {
//   return (
//     <AppContext.Consumer>
//       {context => {
//         return (
//           <LoginForm
//             {...props}
//             updateUser={context.updateUser}
//             updateSessionId={context.updateSessionId}
//           />
//         );
//       }}
//     </AppContext.Consumer>
//   );
// };

export default AppContextHOC(LoginForm);
