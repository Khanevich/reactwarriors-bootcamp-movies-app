import { observable, action } from "mobx";

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
}

export const store = new Store();
