import React from "react";
import UIIcon from "../UIComponents/UIIcon";
import AppContextHOC from "../HOC/AppContextHOC";
import AddFavoriteHOC from "../HOC/AddFavoriteHOC";

const Favorites = ({ isAdded, onAddFavorites }) => {
  return (
    <UIIcon
      onClick={onAddFavorites("favorite")}
      iconName="heart"
      isAdded={isAdded}
    />
  );
};

export default AppContextHOC(AddFavoriteHOC(Favorites, "favoriteMovies"));
