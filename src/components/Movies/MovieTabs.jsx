import React from "react";
import { Nav, NavItem, NavLink as TabNavLink } from "reactstrap";
import { NavLink } from "react-router-dom";
const MovieTabs = ({ movieInfo }) => {
  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <TabNavLink tag="div">
            <NavLink to={`/movie/${movieInfo.id}/detail`} className="movie-tab">
              Detail
            </NavLink>
          </TabNavLink>
        </NavItem>
        <NavItem>
          <TabNavLink tag="div">
            <NavLink to={`/movie/${movieInfo.id}/videos`} className="movie-tab">
              Videos
            </NavLink>
          </TabNavLink>
        </NavItem>
        <NavItem>
          <TabNavLink tag="div">
            <NavLink
              to={`/movie/${movieInfo.id}/credits`}
              className="movie-tab"
            >
              Credits
            </NavLink>
          </TabNavLink>
        </NavItem>
      </Nav>
    </React.Fragment>
  );
};

export default MovieTabs;
