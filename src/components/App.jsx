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

@inject(({ userStore, loginFormStore }) => ({
  userStore,
  loginFormStore
}))
@observer
class App extends React.Component {
  componentDidMount() {
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
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.user === null && this.state.user !== prevState.user) {
  //     this.props.userStore.getFavoriteMovies();
  //   }
  // }

  render() {
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: this.props.userStore.user,
            session_id: this.props.userStore.session_id,
            updateSessionId: this.updateSessionId,
            updateUser: this.updateUser,
            toggleModal: this.props.loginFormStore.toggleModal,
            showLoginModal: this.props.loginFormStore.showLoginModal,
            logOut: this.props.userStore.logOut,
            getFavoriteMovies: this.getFavoriteMovies,
            favoriteMovies: this.props.userStore.favoriteMovies,
            watchList: this.props.userStore.watchList
          }}
        >
          <React.Fragment>
            <LoginModal
              showLoginModal={this.props.loginFormStore.showLoginModal}
              toggleModal={this.props.loginFormStore.toggleModal}
            />
            <Header />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </React.Fragment>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
