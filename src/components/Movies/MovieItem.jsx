import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";

export default class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      heart: false
    };
  }

  onAddFavorites = () => {
    const { user, session_id, item } = this.props;
    // console.log(user, session_id, item);
    this.setState({
      heart: !this.state.heart
    });
    fetchApi(
      `${API_URL}/account/${
        user.id
      }/favorite?api_key=${API_KEY_3}&language=ru-RU&session_id=${session_id}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: item.id,
          favorite: !this.state.heart
        })
      }
    );
  };

  render() {
    const { item } = this.props;
    const heartAccent = this.state.heart ? "far" : "fas";
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
          <span className="heart" onClick={this.onAddFavorites}>
            <FontAwesomeIcon icon={[`${heartAccent}`, "heart"]} />
          </span>
        </div>
      </div>
    );
  }
}
