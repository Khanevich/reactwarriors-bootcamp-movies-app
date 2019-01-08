import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import GenresContainer from "./GenresContainer";
import Pagination from "./Pagination";
import { observer } from "mobx-react";

@observer
class Filters extends React.Component {
  render() {
    return (
      <form className="mb-3">
        <SortBy />
        <PrimaryReleaseYear />
        <GenresContainer />
        <Pagination />
      </form>
    );
  }
}

export default Filters;
