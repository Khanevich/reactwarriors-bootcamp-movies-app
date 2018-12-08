import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class MovieHOC extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        movieInfo: [],
        activeTab: "1",
        movieCheck: []
      };
    }

    componentDidMount() {
      console.log("Component mount");
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
      console.log("render");
      const { movieInfo } = this.state;
      return <Component movieInfo={movieInfo} />;
    }
  };
