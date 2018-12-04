import React from "react";
import UIIcon from "../UIComponents/UIIcon";
import AppContextHOC from "../HOC/AppContextHOC";
import AddFavoriteHOC from "../HOC/AddFavoriteHOC";

const WatchList = ({ isAdded, onAddFavorites }) => {
  // const watchlistStyle = isAdded || isLiked ? "fas" : "far";
  return (
    <UIIcon
      onClick={onAddFavorites("watchlist")}
      iconName="bookmark"
      isAdded={isAdded}
    />
  );
};

export default AppContextHOC(AddFavoriteHOC(WatchList, "watchList"));
