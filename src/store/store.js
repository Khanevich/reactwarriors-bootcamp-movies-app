import { observable, action } from "mobx";
import CallApi, { API_URL, API_KEY_3, fetchApi } from "../api/api";
import { userStore } from "./userStore";

export default class Store {
  @observable
  values = {
    username: null,
    password: null,
    repeatPassword: null
  };

  @observable
  errors = {
    username: false,
    password: false,
    repeatPassword: false,
    base: false
  };

  @observable
  submitting = false;

  @action
  onChangeInfo = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.values[name] = value;

    // this.errors[name] = null;
  };

  @action
  handleBlur = event => {
    console.log("on blur", event.target.name);
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.errors = errors;
    }
  };

  @action
  validateFields = event => {
    const { username, password, repeatPassword } = this.values;
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

  @action
  onChangeErrors = err => {
    this.errors = err;
  };

  @action
  onSubmit = () => {
    this.submitting = true;
    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.values.username,
            password: this.values.password,
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
        userStore.updateSessionId(data.session_id);
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        userStore.updateUser(user);
        this.submitting = false;
        userStore.toggleModal();
      })
      .catch(error => {
        this.submitting = false;
        this.errors.base = error.status_message;
      });
  };

  @action
  onLogin = event => {
    event.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.onChangeErrors(errors);
    } else {
      this.onSubmit();
    }
  };
}

export const store = new Store();
