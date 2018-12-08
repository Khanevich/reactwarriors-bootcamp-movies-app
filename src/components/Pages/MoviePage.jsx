import React from "react";
import MovieHOC from "../HOC/MovieHOC";
import MovieDetail from "../Movies/MovieDetail";
import MovieVideos from "../Movies/MovieVideos";
import MovieCredits from "../Movies/MovieCredits";
import Favorites from "../Movies/Favorites";
import WatchList from "../Movies/WatchList";
import classnames from "classnames";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

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
    console.log("HI");
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
          </div>

          <div className="col-8">
            <div className="card-text">{movieInfo.original_title}</div>
            <div className="card-text">{movieInfo.overview}</div>
            <Favorites item={movieInfo} />
            <WatchList item={movieInfo} />
          </div>

          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  tag="div"
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  <Link
                    to={`/movie/${movieInfo.id}/detail`}
                    className="card-title"
                  >
                    Tab1
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="div"
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  <Link
                    to={`/movie/${movieInfo.id}/videos`}
                    className="card-title"
                  >
                    Tab2
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="div"
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  <Link
                    to={`/movie/${movieInfo.id}/credits`}
                    className="card-title"
                  >
                    Tab3
                  </Link>
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
              <TabPane tabId="2">
                <Route path="/movie/:id/credits" component={MovieVideos} />
              </TabPane>
            </TabContent>
          </div>
          <Switch>
            <Route exact path="/movie/:id/detail" component={MovieDetail} />
            <Route path="/movie/:id/videos" component={MovieVideos} />
            <Route path="/movie/:id/credits" component={MovieCredits} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default MovieHOC(MoviePage);
