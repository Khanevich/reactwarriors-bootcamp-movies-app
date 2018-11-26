import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "../Header/Header";
import Cookies from "universal-cookie";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

const cookies = new Cookies();

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
      total_pages: ""
    };
  }

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    if (!cookies.get("session_id")) {
      cookies.set("session_id", session_id, {
        path: "/",
        maxAge: 2592000
      });
    }

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
    console.log("LOL", session_id);

    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id);
      });
    }
  }

  componentDidUpdate() {
    // console.log("LOL", this.state.session_id);
  }

  render() {
    const { filters, page, total_pages, user, session_id } = this.state;
    return (
      <div>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
        />
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
                session_id={session_id}
                user={user}
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
    );
  }
}
