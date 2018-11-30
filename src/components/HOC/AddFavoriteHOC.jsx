import React from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";

export default Component =>
  class Favorite extends React.Component {
    constructor() {
      super();
      this.state = {
        idAdded: false
      };
    }

    onAddFavorites = name => () => {
      const { user, session_id, item, toggleModal } = this.props;
      if (session_id == null) {
        toggleModal();
      } else {
        this.setState(
          prevState => ({
            isAdded: !prevState.isAdded
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
                  [name]: this.state.isAdded
                })
              }
            );
          }
        );
      }
    };

    render() {
      const { isAdded } = this.state;
      const { icon_name, icon_style } = this.props;
      // const heartAccent = this.state.isAdd ? "fas" : "far";
      return (
        <Component
          isAdded={isAdded}
          icon_name={icon_name}
          icon_style={icon_style}
          onAddFavorites={this.onAddFavorites}
        />
      );
    }
  };
