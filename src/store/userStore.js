import { observable, action, computed } from "mobx";
import CallApi, { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class UserStore {
  @observable user = {};
  @observable session_id = null;
  @observable favoriteMovies = [];
  @observable watchList = [];
  @observable isLoading = false;

  @computed get isAuth() {
    return Boolean(Object.keys(this.user).length);
  }
  @action
  updateAuth = (user, session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.user = user;
    this.session_id = session_id;
  };

  @action
  logOut = (user, session_id) => {
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "DELETE", // переписать на CallApi
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        session_id: this.session_id
      })
    })
      .then(() => {
        this.user = {};
        this.session_id = null;
      })
      .then(() => cookies.remove("session_id"));
  };

  @action
  getFavoriteMovies = () => {
    CallApi.get(`/account/${this.user.id}/favorite/movies`, {
      params: {
        session_id: this.session_id,
        language: "ru-RU"
      }
    })
      .then(data => {
        const moviesID = [];
        data.results.map(movie => moviesID.push(movie.id));
        this.favoriteMovies = moviesID;
        return CallApi.get(`/account/${this.user.id}/watchlist/movies`, {
          params: {
            session_id: this.session_id,
            language: "ru-RU"
          }
        });
      })
      .then(data => {
        const moviesID = [];
        data.results.map(movie => moviesID.push(movie.id));
        this.watchList = moviesID;
      });
  };
}

export const userStore = new UserStore();
