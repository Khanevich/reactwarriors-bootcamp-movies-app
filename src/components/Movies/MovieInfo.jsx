import React from "react";
import Favorites from "./Favorites";
import WatchList from "./WatchList";

const MovieInfo = ({ movieInfo }) => {
  return (
    <div className="movie-info">
      <div className="col-5">
        <img
          className="movie-image card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
          style={{ width: "300px" }}
          alt=""
        />
      </div>

      <div className=" movie-text col-7">
        <div className="card-text">{movieInfo.original_title}</div>
        <div className="card-text">{movieInfo.overview}</div>
        <Favorites item={movieInfo} />
        <WatchList item={movieInfo} />
      </div>
    </div>
  );
};

export default MovieInfo;
