import React from "react";
import UIIcon from "../UIComponents/UIIcon";
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

export default AddFavoriteHOC(Favorites, "favoriteMovies");
