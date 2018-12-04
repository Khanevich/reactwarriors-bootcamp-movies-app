import React from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";

export default Component =>
  class AddFavoriteHOC extends React.Component {
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

    // getLikesInfo = () => {
    //   if (this.props.favoriteMovies.includes(this.props.item.id)) {
    //     console.log("Hi");
    //     this.setState({
    //       isAdded: !this.state.isAdded
    //     });
    //   }
    // };

    componentDidUpdate(prevProps, prevState) {
      if (this.props.user !== prevProps.user) {
        if (this.props.favoriteMovies.includes(this.props.item.id)) {
          console.log("Hi");
          this.setState({
            isAdded: !this.state.isAdded
          });
        }
        // console.log("Hello");
        // this.getLikesInfo();
      }
    }

    render() {
      const { isAdded } = this.state;

      return (
        <Component isAdded={isAdded} onAddFavorites={this.onAddFavorites} />
      );
    }
  };
