import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import GenresContainer from "./GenresContainer";
import Pagination from "./Pagination";

const Filters = props => {
  const {
    filters: { sort_by, primary_release_year, with_genres },
    page,
    total_pages,
    onChangeFilters,
    onChangePage
  } = props;

  return (
    <form className="mb-3">
      <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
      <PrimaryReleaseYear
        primary_release_year={primary_release_year}
        onChangeFilters={onChangeFilters}
      />
      <GenresContainer
        with_genres={with_genres}
        onChangeFilters={onChangeFilters}
      />
      <Pagination
        page={page}
        total_pages={total_pages}
        onChangePage={onChangePage}
      />
    </form>
  );
};

export default Filters;
