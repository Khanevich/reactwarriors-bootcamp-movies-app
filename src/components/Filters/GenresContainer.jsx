import React from "react";
import CallApi from "../../api/api";
import Genres from "./Genres";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class GenresContainer extends React.Component {
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
  }

  onChange = event => {
    this.props.moviesPageStore.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [
              ...this.props.moviesPageStore.filters.with_genres,
              event.target.value
            ]
          : this.props.moviesPageStore.filters.with_genres.filter(
              genre => genre !== event.target.value
            )
      }
    });
  };

  render() {
    const { genresList } = this.state;
    const { with_genres } = this.props.moviesPageStore.filters;
    return (
      <Genres
        genresList={genresList}
        with_genres={with_genres}
        onChange={this.onChange}
      />
    );
  }
}

export default GenresContainer;
