import React from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";
import _ from "lodash";
import { inject, observer } from "mobx-react";

export default (Component, type) =>
  @inject(({ userStore, loginFormStore }) => ({
    userStore,
    loginFormStore
  }))
  @observer
  class AddFavoriteHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAdded: this.getAddById({
          list: props.userStore[type],
          id: props.item.id
        })
      };
    }

    getAddById = ({ list, id }) => {
      list.some(item => item.id === id);
    };

    onAddFavorites = name => () => {
      const { item } = this.props;
      const { user, session_id } = this.props.userStore;
      const { toggleModal } = this.props.loginFormStore;
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
            ).then(() => this.props.userStore.getFavoriteMovies());
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
