import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./Pages/MoviesPage";
import MoviePage from "./Pages/MoviePage";
import LoginModal from "./Modals/LoginModal";
import Cookies from "universal-cookie";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import { inject, observer } from "mobx-react";

library.add(fas, far);
const cookies = new Cookies();

@inject(({ userStore, loginFormStore }) => ({
  userStore,
  loginFormStore
}))
@observer
class App extends React.Component {
  componentDidMount() {
    this.props.userStore.isLoading = true;
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.props.userStore.updateAuth(user, session_id);
      });
    } else {
      this.props.userStore.isLoading = false;
    }
    this.props.userStore.isLoading = false;
  }

  render() {
    const { isLoading } = this.props.userStore;
    const { showLoginModal, toggleModal } = this.props.loginFormStore;
    return (
      <BrowserRouter>
        {isLoading ? (
          <div className="loader">
            <Loader type="Puff" color="#00BFFF" height="100" width="100" />
          </div>
        ) : (
          <React.Fragment>
            <LoginModal
              showLoginModal={showLoginModal}
              toggleModal={toggleModal}
            />
            <Header />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </React.Fragment>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
