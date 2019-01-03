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

export const AppContext = React.createContext();

@inject(({ userStore }) => ({
  getFavoriteMovies: userStore.getFavoriteMovies,
  isAuth: userStore.isAuth,
  logOut: userStore.logOut,
  updateUser: userStore.updateUser,
  updateSessionId: userStore.updateSessionId,
  isLoading: userStore.isLoading,
  session_id: userStore.session_id,
  user: userStore.user,
  updateAuth: userStore.updateAuth,
  showLoginModal: userStore.showLoginModal,
  toggleModal: userStore.toggleModal,
  userStore: userStore
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
        this.props.userStore.isLoading = false;
        this.props.updateAuth(user, session_id);
      });
    } else {
      this.props.userStore.isLoading = false;
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.user === null && this.state.user !== prevState.user) {
  //     this.getFavoriteMovies();
  //   }
  // }

  render() {
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: this.props.user,
            session_id: this.props.session_id,
            updateSessionId: this.props.updateSessionId,
            updateUser: this.props.updateUser,
            toggleModal: this.props.toggleModal,
            showLoginModal: this.props.showLoginModal,
            logOut: this.props.logOut,
            getFavoriteMovies: this.props.getFavoriteMovies,
            favoriteMovies: this.props.favoriteMovies,
            watchList: this.props.watchList,
            isAuth: this.props.isAuth
          }}
        >
          {this.props.isLoading ? (
            <div className="loader">
              <Loader type="Puff" color="#00BFFF" height="100" width="100" />
            </div>
          ) : (
            <React.Fragment>
              <LoginModal
                showLoginModal={this.props.showLoginModal}
                toggleModal={this.props.toggleModal}
              />
              <Header
                user={this.props.user}
                toggleModal={this.props.toggleModal}
              />
              <Route exact path="/" component={MoviesPage} />
              <Route path="/movie/:id" component={MoviePage} />
            </React.Fragment>
          )}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
