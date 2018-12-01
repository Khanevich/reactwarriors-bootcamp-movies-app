import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./Header/Login/LoginForm";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2018",
        with_genres: []
      },
      page: 1,
      total_pages: "",
      showLoginModal: false
    };
  }

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

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePage = page => {
    console.log(page);
    this.setState({
      page
    });
  };

  onClear = event => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2018",
        with_genres: []
      },
      page: 1
    });
  };

  getTotalPages = total_pages => {
    this.setState({
      total_pages
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
      });
    }
  }

  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      session_id,
      showLoginModal
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user,
          session_id,
          updateSessionId: this.updateSessionId,
          updateUser: this.updateUser,
          toggleModal: this.toggleModal,
          showLoginModal,
          logOut: this.logOut
        }}
      >
        <div>
          <Modal isOpen={this.state.showLoginModal} toggle={this.toggleModal}>
            <ModalBody>
              <LoginForm />
            </ModalBody>
          </Modal>
          <Header user={user} toggleModal={this.toggleModal} />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <button className="btn btn-light" onClick={this.onClear}>
                      Отчистить
                    </button>
                    <Filters
                      page={page}
                      session_id={session_id}
                      total_pages={total_pages}
                      filters={filters}
                      onChangeFilters={this.onChangeFilters}
                      onChangePage={this.onChangePage}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  page={page}
                  onChangePage={this.onChangePage}
                  getTotalPages={this.getTotalPages}
                  onChangeFilters={this.onChangeFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
