import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./Pages/MoviesPage";
import MoviePage from "./Pages/MoviePage";
import LoginModal from "./Modals/LoginModal";
import Cookies from "universal-cookie";
import CallApi, { API_URL, API_KEY_3, fetchApi } from "../api/api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import Store from "../store/store";
import { observer } from "mobx";

library.add(fas, far);
const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      session_id: null,
      showLoginModal: false,
      favoriteMovies: [],
      watchList: [],
      isLoading: false
    };
  }

  getFavoriteMovies = () => {
    const { session_id, user } = this.state;
    console.log(session_id, user);
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU"
      }
    })
      .then(data => {
        const moviesID = [];
        data.results.map(movie => moviesID.push(movie.id));
        this.setState({
          favoriteMovies: [...moviesID]
        });
        return CallApi.get(`/account/${user.id}/watchlist/movies`, {
          params: {
            session_id: session_id,
            language: "ru-RU"
          }
        });
      })
      .then(data => {
        const moviesID = [];
        data.results.map(movie => moviesID.push(movie.id));
        this.setState({
          watchList: [...moviesID]
        });
      });
  };

  toggleModal = () => {
    console.log("toggle");
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  };

  logOut = (user, session_id) => {
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        session_id: this.state.session_id
      })
    })
      .then(() =>
        this.setState({
          user: null,
          session_id: null
        })
      )
      .then(() => cookies.remove("session_id"));
  };

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateAuth = (user, session_id) => {
    this.setState({
      user,
      session_id
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });

    this.setState({
      session_id
    });
  };

  componentDidMount() {
    this.setState({
      isLoading: false
    });
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.setState(
          {
            isLoading: false
          },
          () => {
            this.updateAuth(user, session_id);
          }
        );
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user === null && this.state.user !== prevState.user) {
      this.getFavoriteMovies();
    }
  }

  render() {
    const {
      user,
      session_id,
      showLoginModal,
      favoriteMovies,
      watchList,
      isLoading
    } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            updateSessionId: this.updateSessionId,
            updateUser: this.updateUser,
            toggleModal: this.toggleModal,
            showLoginModal,
            logOut: this.logOut,
            getFavoriteMovies: this.getFavoriteMovies,
            favoriteMovies,
            watchList
          }}
        >
          {isLoading ? (
            <div className="loader">
              <Loader type="Puff" color="#00BFFF" height="100" width="100" />
            </div>
          ) : (
            <React.Fragment>
              <LoginModal
                showLoginModal={this.state.showLoginModal}
                toggleModal={this.toggleModal}
              />
              <Header user={user} toggleModal={this.toggleModal} />
              <Route exact path="/" component={MoviesPage} />
              <Route path="/movie/:id" component={MoviePage} />
            </React.Fragment>
          )}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
