import React from "react";
import Favorites from "./Favorites";
import WatchList from "./WatchList";

const MovieInfo = ({ movieInfo }) => {
  return (
    <div
      className="movie-info"
      style={{
        background: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${
          movieInfo.backdrop_path
        }
      ) no-repeat 50%/cover`
      }}
    >
      <div className="movie-container">
        <div className="movie-page">
          <div className="movie-image col-5">
            <img
              className=" card-img-top"
              src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
              style={{ width: "300px" }}
              alt=""
            />
          </div>
          <div className=" movie-text col-7">
            <div className="card-text" style={{ fontSize: "40px" }}>
              {movieInfo.original_title}
            </div>
            <div className="card-text">{movieInfo.overview}</div>
            <div className=" row movie_icons d-flex justify-content-around p-4 col-3">
              <div className="icon-style">
                <Favorites item={movieInfo} />
              </div>
              <div className="icon-style">
                <WatchList item={movieInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
