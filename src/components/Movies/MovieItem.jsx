import React from "react";
import Favorite from "./Favorite";
import WatchList from "./WatchList";

class MovieItem extends React.Component {
  render() {
    const { item, toggleModal } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <Favorite item={item} toggleModal={toggleModal} />
          <WatchList item={item} toggleModal={toggleModal} />
        </div>
      </div>
    );
  }
}

export default MovieItem;
