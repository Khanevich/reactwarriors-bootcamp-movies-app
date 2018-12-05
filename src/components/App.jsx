import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./Pages/MoviesPage";
import MoviePage from "./Pages/MoviePage";
import LoginForm from "./Header/Login/LoginForm";
import { Modal, ModalBody } from "reactstrap";
import Cookies from "universal-cookie";
import CallApi, { API_URL, API_KEY_3, fetchApi } from "../api/api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter, Route, Link } from "react-router-dom";

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
      watchList: []
    };
  }

  getFavoriteMovies = () => {
    const { session_id, user } = this.state;
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU"
      }
    })
      .then(data => {
        const moviesID = [];
        data.results.map(movie => {
          moviesID.push(movie.id);
        });
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
        data.results.map(movie => {
          moviesID.push(movie.id);
        });
        this.setState({
          watchList: [...moviesID]
        });
      });
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

  toggleModal = () => {
    console.log("toggle");
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  };

  updateUser = user => {
    this.setState({
      user
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
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id);
        this.getFavoriteMovies();
      });
    }
  }

  render() {
    const {
      user,
      session_id,
      showLoginModal,
      favoriteMovies,
      watchList
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
          <div>
            <Modal isOpen={this.state.showLoginModal} toggle={this.toggleModal}>
              <ModalBody>
                <LoginForm />
              </ModalBody>
            </Modal>
            <Header user={user} toggleModal={this.toggleModal} />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
