import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class Favorite extends React.Component {
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
    const heartAccent = this.state.favorite ? "fas" : "far";
    return (
      <div className="heart" onClick={this.onAddFavorites("favorite")}>
        <FontAwesomeIcon icon={[`${heartAccent}`, "heart"]} />
      </div>
    );
  }
}

export default AppContextHOC(Favorite);
