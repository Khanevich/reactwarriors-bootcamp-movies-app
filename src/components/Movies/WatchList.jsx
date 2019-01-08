import React from "react";
import UIIcon from "../UIComponents/UIIcon";
import AddFavoriteHOC from "../HOC/AddFavoriteHOC";

const WatchList = ({ isAdded, onAddFavorites }) => {
  return (
    <UIIcon
      onClick={onAddFavorites("watchlist")}
      iconName="bookmark"
      isAdded={isAdded}
    />
  );
};

export default AddFavoriteHOC(WatchList, "watchList");
