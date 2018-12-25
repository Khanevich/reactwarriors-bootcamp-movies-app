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
import MainStore from "../store/mainStore";

library.add(fas, far);
const cookies = new Cookies();

export const AppContext = React.createContext();

@inject(({ store: mainStore }) => ({
  user: mainStore.user,
  showLoginModal: mainStore.showLoginModal,
  toggleModal: mainStore.toggleModal,
  isLoading: mainStore.isLoading,
  pageMount: mainStore.pageMount,
  pageUpdate: mainStore.pageUpdate
}))
@observer
export default class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: null,
  //     session_id: null,
  //     filters: {
  //       sort_by: "popularity.desc",
  //       primary_release_year: "2018",
  //       with_genres: []
  //     },
  //     page: 1,
  //     total_pages: "",
  //     showLoginModal: false,
  //     favoriteMovies: [],
  //     watchList: []
  //   };
  // }
  //
  // getFavoriteMovies = () => {
  //   const { session_id, user } = this.state;
  //   CallApi.get(`/account/${user.id}/favorite/movies`, {
  //     params: {
  //       session_id: session_id,
  //       language: "ru-RU"
  //     }
  //   })
  //     .then(data => {
  //       const moviesID = [];
  //       data.results.map(movie => {
  //         moviesID.push(movie.id);
  //       });
  //       this.setState({
  //         favoriteMovies: [...moviesID]
  //       });
  //       return CallApi.get(`/account/${user.id}/watchlist/movies`, {
  //         params: {
  //           session_id: session_id,
  //           language: "ru-RU"
  //         }
  //       });
  //     })
  //     .then(data => {
  //       const moviesID = [];
  //       data.results.map(movie => {
  //         moviesID.push(movie.id);
  //       });
  //       this.setState({
  //         watchList: [...moviesID]
  //       });
  //     });
  // };
  //
  // logOut = (user, session_id) => {
  //   fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
  //     method: "DELETE",
  //     mode: "cors",
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       session_id: this.state.session_id
  //     })
  //   })
  //     .then(() =>
  //       this.setState({
  //         user: null,
  //         session_id: null
  //       })
  //     )
  //     .then(() => cookies.remove("session_id"));
  // };
  //
  // toggleModal = () => {
  //   console.log("toggle");
  //   this.setState(prevState => ({
  //     showLoginModal: !prevState.showLoginModal
  //   }));
  // };
  //
  // updateUser = user => {
  //   this.setState({
  //     user
  //   });
  // };
  //
  // updateSessionId = session_id => {
  //   cookies.set("session_id", session_id, {
  //     path: "/",
  //     maxAge: 2592000
  //   });
  //
  //   this.setState({
  //     session_id
  //   });
  // };
  //
  // onChangeFilters = event => {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   this.setState(prevState => ({
  //     filters: {
  //       ...prevState.filters,
  //       [name]: value
  //     }
  //   }));
  // };
  //
  // onChangePage = page => {
  //   console.log(page);
  //   this.setState({
  //     page
  //   });
  // };
  //
  // onClear = event => {
  //   this.setState({
  //     filters: {
  //       sort_by: "popularity.desc",
  //       primary_release_year: "2018",
  //       with_genres: []
  //     },
  //     page: 1
  //   });
  // };
  //
  // getTotalPages = total_pages => {
  //   this.setState({
  //     total_pages
  //   });
  // };

  componentDidMount() {
    this.props.pageMount();
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.pageUpdate();
  }

  render() {
    const { user, showLoginModal, toggleModal, isLoading } = this.props;

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
            <Header user={user} toggleModal={toggleModal} />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </React.Fragment>
        )}
      </BrowserRouter>
    );
  }
}
