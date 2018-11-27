import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${with_genres}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.getTotalPages(data.total_pages);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate({ filters: prevFilters, page: prevPage }) {
    const { filters, page } = this.props;
    const filtersEq =
      filters === prevFilters ||
      Object.keys(filters)
        .map(
          name =>
            Array.isArray(filters[name])
              ? filters[name].join(",") === prevFilters[name].join(",")
              : filters[name] === prevFilters[name]
        )
        .reduce((res, cur) => res && cur, true);
    if (!filtersEq) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }
    if (page !== prevPage) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }
  render() {
    const { movies } = this.state;
    const { user, session_id, toggleModal } = this.props;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem
                user={user}
                session_id={session_id}
                item={movie}
                toggleModal={toggleModal}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
