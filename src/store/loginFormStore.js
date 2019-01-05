import { observable, action } from "mobx";
import { userStore } from "./userStore";
import CallApi, { API_URL, API_KEY_3, fetchApi } from "../api/api";

export default class LoginFormStore {
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

  @observable showLoginModal = false;
  @observable isLoading = true;

  @observable
  submitting = false;

  @action
  onChangeInfo = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.values[name] = value;
    this.errors[name] = null;
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
  onChangeSubmitting = nos => {
    console.log("submitted");
    this.submitting = nos;
  };

  @action
  onChangeErrors = err => {
    this.errors = err;
  };

  onSubmit = () => {
    let session_id = "";
    this.onChangeSubmitting(true);
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
        let session_id = data.session_id;
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        userStore.updateAuth(user, session_id);
        this.onChangeSubmitting(false);
        this.toggleModal();
      })
      .catch(error => {
        console.log("error", error);
        this.onChangeSubmitting(false);
        this.errors.base = error.status_message;
      });
  };

  @action
  toggleModal = () => {
    console.log("toggle");
    this.showLoginModal = !this.showLoginModal;
  };
}

export const loginFormStore = new LoginFormStore();
