import { observable, action, computed } from "mobx";
import CallApi, { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class UserStore {
  @observable
  user = {};
  @observable
  session_id = {};
  @observable
  showLoginModal = false;
  @observable
  favoriteMovies = [12323453];
  @observable
  watchList = [];
  @observable
  isLoading = true;

  @computed get isAuth() {
    return Boolean(Object.keys(this.user).length);
  }

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
        // this.setState({
        //   favoriteMovies: [...moviesID]
        // });
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
        // this.setState({
        //   watchList: [...moviesID]
        // });
        this.watchList = moviesID;
      })
      .then(() => console.log("giii"));
  };

  toggleModal = () => {
    this.showLoginModal = !this.showLoginModal;
  };

  updateUser = user => {
    this.user = user;
  };

  // @computed get isAuth() {
  //   return Boolean(Object.keys(this.user).length);
  // }
  //
  // @action
  // getFavoriteMovies = () => {
  //   CallApi.get(`/account/${this.user.id}/favorite/movies`, {
  //     params: {
  //       session_id: this.session_id,
  //       language: "ru-RU"
  //     }
  //   })
  //     .then(data => {
  //       const moviesID = [];
  //       data.results.map(movie => moviesID.push(movie));
  //       this.favoriteMovies = moviesID;
  //       return CallApi.get(`/account/${this.user.id}/watchlist/movies`, {
  //         params: {
  //           session_id: this.session_id,
  //           language: "ru-RU"
  //         }
  //       });
  //     })
  //     .then(data => {
  //       const moviesID = [];
  //       data.results.map(movie => moviesID.push(movie.id));
  //       this.watchList = moviesID;
  //     });
  // };
  //
  // @action
  // toggleModal = () => {
  //   this.showLoginModal = !this.showLoginModal;
  // };
  //
  // @action
  // logOut = (user, session_id) => {
  //   fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
  //     method: "DELETE",
  //     mode: "cors",
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       session_id: this.session_id
  //     })
  //   })
  //     .then(() => {
  //       this.user = null;
  //       this.session_id = null;
  //     })
  //     .then(() => cookies.remove("session_id"));
  // };
  //
  // @action
  // updateUser = user => {
  //   this.user = this.user;
  // };
  //
  // @action
  // updateAuth = (user, session_id) => {
  //   this.user = this.user;
  //   this.session_id = this.session_id;
  // };
  //
  // @action
  // updateSessionId = session_id => {
  //   cookies.set("session_id", session_id, {
  //     path: "/",
  //     maxAge: 2592000
  //   });
  //   this.session_id = this.session_id;
  // };
}

export const userStore = new UserStore();
