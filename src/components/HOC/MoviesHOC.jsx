import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class MovieHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: []
      };
    }

    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;
      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
      };

      if (with_genres.length > 0) {
        queryStringParams.with_genres = with_genres.join(",");
      }

      CallApi.get("/discover/movie", {
        params: queryStringParams
      }).then(data => {
        this.setState({
          movies: data.results
        });
        this.props.getTotalPages(data.total_pages);
      });
    };

    // checkLikes = () => {
    //   // this.state.movies.map(movie => {
    //   //   if (this.props.favoriteMovies.includes(movie.id)) {
    //   //     console.log("Hello");
    //   //     this.setState({
    //   //       likedMovieID: true
    //   //     });
    //   //   }
    //   // });
    // };

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
      const { movies, likedMovieID } = this.state;
      return <Component movies={movies} likedMovieID={likedMovieID} />;
    }
  };
