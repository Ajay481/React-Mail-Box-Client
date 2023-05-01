import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };
  return (
    <header className="bg-secondary">
      <div className="d-flex p-3">
        <div className="text-white display-5 fw-bold me-5 ms-5">yahoomail</div>
        <input
          className="w-75"
          name="search"
          type="text"
          placeholder="Find messages, documents, photos or people"
          onChange={searchHandler}
          value={search}
        />
        <button className="bg-primary text-white">Search</button>
        <button className="bg-info" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
