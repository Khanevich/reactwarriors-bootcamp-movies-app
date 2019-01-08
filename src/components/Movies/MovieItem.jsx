import React from "react";
import Favorites from "./Favorites";
import WatchList from "./WatchList";
import { Link } from "react-router-dom";

class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <Link to={`/movie/${item.id}/detail`} className="card-title">
            {item.title}
          </Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <Favorites item={item} />
          <WatchList item={item} />
        </div>
      </div>
    );
  }
}

export default MovieItem;
