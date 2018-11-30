import React from "react";
import CallApi from "../../api/api";
import Genres from "./Genres";

export default class GenresContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      genresList: []
    };
  }

  componentDidMount() {
    CallApi.get("/genre/movie/list", {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        genresList: data.genres
      });
    });
    // fetch(link)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.setState({
    //       genresList: data.genres
    //     });
    //   });
  }

  onChange = event => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...this.props.with_genres, event.target.value]
          : this.props.with_genres.filter(genre => genre !== event.target.value)
      }
    });
  };

  render() {
    const { genresList } = this.state;
    const { with_genres } = this.props;
    return (
      <Genres
        genresList={genresList}
        with_genres={with_genres}
        onChange={this.onChange}
      />
    );
  }
}
