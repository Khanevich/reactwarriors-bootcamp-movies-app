import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";

export default class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      watchlist: false
    };
  }

  onAddFavorites = name => () => {
    const { user, session_id, item, toggleModal } = this.props;
    if (user == null) {
      toggleModal();
    } else {
      this.setState(
        prevState => ({
          ...prevState,
          [name]: !prevState[name]
        }),
        () => {
          fetchApi(
            `${API_URL}/account/${user.id}/${[
              name
            ]}?api_key=${API_KEY_3}&language=ru-RU&session_id=${session_id}`,
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-type": "application/json;charset=utf-8"
              },
              body: JSON.stringify({
                media_type: "movie",
                media_id: item.id,
                [name]: !this.state.name
              })
            }
          );
        }
      );
    }
  };

  render() {
    const { item } = this.props;
    const heartAccent = this.state.favorite ? "fas" : "far";
    const watchlistAccent = this.state.watchlist ? "fas" : "far";

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
          <div className="heart" onClick={this.onAddFavorites("favorite")}>
            <FontAwesomeIcon icon={[`${heartAccent}`, "heart"]} />
          </div>
          <div
            className="watch-list"
            onClick={this.onAddFavorites("watchlist")}
            value="watchlist"
          >
            <FontAwesomeIcon icon={[`${watchlistAccent}`, "bookmark"]} />
          </div>
        </div>
      </div>
    );
  }
}
