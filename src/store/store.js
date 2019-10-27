import { observable, action } from "mobx";
import CallApi from "../api/api";

export default class Store {
  @observable
  username = "";

  @observable
  password = "";

  @observable
  repeatPassword = "";

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
    this[name] = value;
    this.errors = {
      ...this.errors,
      [name]: null,
      base: null
    };
    // this.setState(prevState => ({
    //   [name]: value,
    //   errors: {
    //     ...prevState.errors,
    //     [name]: null,
    //     base: null
    //   }
    // }));
  };

  @action
  handleBlur = () => {
    console.log("on blur");
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      // this.setState({
      //   errors: {
      //     ...this.state.errors,
      //     ...errors
      //   }
      // });
      this.errors = {
        ...this.errors,
        errors
      };
    }
  };

  validateFields = () => {
    const { username, password, repeatPassword } = this;
    const errors = {
      username: null,
      password: null,
      repeatPassword: null
    };

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

  onSubmit = ({ updateSessionId, updateUser }) => {
    // this.setState({
    //   submitting: true
    // });
    this.submitting = true;
    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.username,
            password: this.password,
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
        updateSessionId(data.session_id);
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        updateUser(user);
        this.submitting = false;
        this.props.toggleModal();
        console.log(user);
      })
      .catch(error => {
        console.log("error", error);
        this.submitting = false;
        this.errors = {
          base: error.status_message
        };
      });
  };

  onLogin = event => {
    event.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.errors = {
        ...this.errors,
        ...errors
      };
    } else {
      this.onSubmit();
    }
  };

  countErrors() {
    return Object.values(this.errors).filter(x => x).length;
  }

  validate = () => {
    const errors = this.validateFields();
    this.errors = {
      ...this.errors,
      ...errors
    };
  };

  update = (name, value) => {
    if (Object.prototype.hasOwnProperty.call(this, name)) {
      this[name] = value;
      this.validate();
    }
  };

  submit = callbacks => {
    if (this.countErrors() === 0) this.onSubmit(callbacks);
  };
}
