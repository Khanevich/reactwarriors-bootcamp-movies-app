import React from "react";
import MovieInfoHOC from "../HOC/MovieInfoHOC";
import MovieDetail from "../Movies/MovieDetail";
import MovieVideos from "../Movies/MovieVideos";
import MovieCredits from "../Movies/MovieCredits";
import Favorites from "../Movies/Favorites";
import WatchList from "../Movies/WatchList";
import classnames from "classnames";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";

class MoviePage extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const { movieInfo, activeTab } = this.props;
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-4">
              <img
                className="card-img-top card-img--height"
                src={`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path ||
                  movieInfo.poster_path}`}
                alt=""
              />
            </div>

            <div className="col-8">
              <div className="card-text">{movieInfo.original_title}</div>
              <div className="card-text">{movieInfo.overview}</div>
              <Favorites item={movieInfo} />
              <WatchList item={movieInfo} />
            </div>
          </div>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  <Link to={`/movie/${movieInfo.id}/detail`}>Tab1</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  <Link to={`/movie/${movieInfo.id}/videos`}>Tab2</Link>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Route path="/movie/:id/detail" component={MovieDetail} />
              </TabPane>
              <TabPane tabId="2">
                <Route path="/movie/:id/videos" component={MovieVideos} />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default MovieInfoHOC(MoviePage);
