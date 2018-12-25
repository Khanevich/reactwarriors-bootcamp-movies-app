import { observable } from "mobx";

export default class MainStore {
  @observable
  user = null;
  @observable
  session_id = null;
  @observable
  showLoginModal = false;
  @observable
  favoriteMovies = [];
  @observable
  watchList = [];
  @observable
  isLoading = false;

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
        this.favoriteMovies = [...moviesID];
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
        this.watchList = [...moviesID];
      });
  };

  toggleModal = () => {
    // this.setState(prevState => ({
    //   showLoginModal: !prevState.showLoginModal
    // }));
    this.showLoginModal = !this.showLoginModal;
  };

  logOut = (user, session_id) => {
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        session_id: this.session_id
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
    this.user = this.user;
  };

  updateAuth = (user, session_id) => {
    this.user = user;
    this.session_id = session_id;
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });

    this.session_id = session_id;
  };

  pageMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        // this.setState(
        //   {
        //     isLoading: false
        //   },
        //   () => {
        //     this.updateAuth(user, session_id);
        //   }
        // );
        this.isLoading = false;
        this.updateAuth(user, session_id);
      });
    }
  }

  pageUpdate() {
    if (this.user === null) {
      this.getFavoriteMovies();
    }
  }
}
