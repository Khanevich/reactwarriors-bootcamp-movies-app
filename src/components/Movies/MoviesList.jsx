import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC";
import PropTypes from "prop-types";

const MoviesList = ({ toggleModal, movies }) => {
  return (
    <div className="row">
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem item={movie} toggleModal={toggleModal} />
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
