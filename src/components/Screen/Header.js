import React, { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
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
      </div>
    </header>
  );
};

export default Header;
