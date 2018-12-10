import React from "react";
import CallApi from "../../../api/api";

export default class MovieCredits extends React.Component {
  constructor() {
    super();
    this.state = {
      movieCredits: []
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}/credits`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        movieCredits: data.cast
      });
    });
  }

  render() {
    const { movieCredits } = this.state;
    return (
      <div>
        {movieCredits.map(credit => (
          <img
            key={credit.id}
            className="card-img"
            src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
            style={{ width: "180px", height: "270px" }}
            alt=""
          />
        ))}
      </div>
    );
  }
}
