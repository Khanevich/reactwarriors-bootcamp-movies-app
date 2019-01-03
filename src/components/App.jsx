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
  check: userStore.check,
  user: userStore.user,
  session_id: userStore.session_id,
  showLoginModal: userStore.showLoginModal,
  favoriteMovies: userStore.favoriteMovies,
  watchList: userStore.showLoginModal,
  isLoading: userStore.isLoading,
  isAuth: userStore.isAuth,
  getFavoriteMovies: userStore.getFavoriteMovies,
  toggleModal: userStore.toggleModal,
  logOut: userStore.logOut,
  updateUser: userStore.updateUser,
  updateAuth: userStore.updateAuth,
  updateSessionId: userStore.updateSessionId,
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
    console.log("LOL", this.props.favoriteMovies);
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: this.props.user,
            session_id: this.props.session_id,
            showLoginModal: this.props.showLoginModal,
            favoriteMovies: this.props.favoriteMovies,
            watchList: this.props.watchList,
            isLoading: this.props.isLoading,
            isAuth: this.props.isAuth,
            getFavoriteMovies: this.props.getFavoriteMovies,
            toggleModal: this.props.toggleModal,
            logOut: this.props.logOut,
            updateUser: this.props.updateUser,
            updateAuth: this.props.updateAuth,
            updateSessionId: this.props.updateSessionId
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
