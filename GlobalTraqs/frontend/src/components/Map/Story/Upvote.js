import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { userFirstUpvote, userUpovte } from "../../../actions/pins";
import { useDispatch, useSelector } from "react-redux";
function Upvote(props) {
  const auth = useSelector((state) => state.auth);

  const { favoritedPin, upvoteid, user } = auth;
  const dispatch = useDispatch();

  return (
    <FavoriteButton
      onClick={() =>
        favoritedPin
          ? dispatch(userUpovte(upvoteid))
          : dispatch(userFirstUpvote(props.id, user.id))
      }
    >
      {favoritedPin ? "Favorited" : "Favorite"}
    </FavoriteButton>
  );
}

export default Upvote;

const FavoriteButton = ({ children, onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};
