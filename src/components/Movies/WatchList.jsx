import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class WatchList extends React.Component {
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
    const watchlistAccent = this.state.watchlist ? "fas" : "far";
    return (
      <div
        className="watch-list"
        onClick={this.onAddFavorites("watchlist")}
        value="watchlist"
      >
        <FontAwesomeIcon icon={[`${watchlistAccent}`, "bookmark"]} />
      </div>
    );
  }
}

export default AppContextHOC(WatchList);
