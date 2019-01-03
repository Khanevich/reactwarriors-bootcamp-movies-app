import React from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";
import _ from "lodash";

export default (Component, type) =>
  class AddFavoriteHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAdded: this.getAddById({
          list: props[type],
          id: props.item.id
        })
      };
    }

    getAddById = ({ list, id }) => {
      list.some(item => item.id === id);
    };
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
            ).then(() => this.props.getFavoriteMovies());
          }
        );
      }
    };

    componentDidUpdate(prevProps, prevState) {
      if (
        !_.isEqual(prevProps[this.listName], this.props[this.listName]) &&
        this.state.isAdded !==
          this.getAddById({
            list: this.props[this.listName],
            id: this.props.item.id
          })
      ) {
        this.setState({
          isAdded: this.getAddById({
            list: this.props[this.listName],
            id: this.props.item.id
          })
        });
      }
    }

    render() {
      console.log("ICONHOC");
      const { isAdded } = this.state;
      return (
        <Component isAdded={isAdded} onAddFavorites={this.onAddFavorites} />
      );
    }
  };
