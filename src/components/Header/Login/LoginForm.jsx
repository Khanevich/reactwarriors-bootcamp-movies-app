import React from "react";
import CallApi from "../../../api/api";
import Field from "./Field/Field";
import AppContextHOC from "../../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ store }) => ({
  values: store.values,
  errors: store.errors,
  submitting: store.submitting,
  onChangeInfo: store.onChangeInfo,
  validateFields: store.validateFields,
  handleBlur: store.handleBlur,
  onChangeErrors: store.onChangeErrors,
  onSubmit: store.onSubmit,
  onLogin: store.onLogin,
  store: store
}))
@observer
class LoginForm extends React.Component {
  // onSubmit = () => {
  //   this.props.store.submitting = true;
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
  //       this.props.store.submitting = false;
  //       this.props.toggleModal();
  //     })
  //     .catch(error => {
  //       this.props.store.submitting = false;
  //       this.props.errors.base = error.status_message;
  //     });
  // };

  // onLogin = event => {
  //   event.preventDefault();
  //   const errors = this.props.validateFields();
  //   if (Object.keys(errors).length > 0) {
  //     this.props.onChangeErrors(errors);
  //   } else {
  //     this.onSubmit();
  //   }
  // };

  render() {
    const {
      values,
      errors,
      submitting,
      onChangeInfo,
      handleBlur,
      onLogin
    } = this.props;
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
