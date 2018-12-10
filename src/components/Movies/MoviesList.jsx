import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "../HOC/MoviesHOC";

const MoviesList = ({ movies, likedMovieID }) => {
  return (
    <div className="row">
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem item={movie} />
          </div>
        );
      })}
    </div>
  );
};

export default MoviesHOC(MoviesList);
