import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class MovieInfoHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        movieInfo: [],
        activeTab: "1"
      };
    }

    getMovieInfo = () => {
      console.log(this.state.movieInfo);
    };

    componentDidMount() {
      CallApi.get(`/movie/${this.props.match.params.id}`, {
        params: {
          language: "ru-RU"
        }
      }).then(data => {
        this.setState({
          movieInfo: data
        });
      });
    }
    render() {
      const { movieInfo } = this.state;
      return <Component movieInfo={movieInfo} />;
    }
  };
