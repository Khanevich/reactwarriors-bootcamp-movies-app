import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "../HOC/MoviesHOC";
import PropTypes from "prop-types";

const MoviesList = ({ movies, likedMovieID }) => {
  return (
    <div className="row">
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem item={movie} likedMovieID={likedMovieID} />
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesHOC(MoviesList);
