import React from "react";

function SearchBar({ search, onSearchChange, onSubmit }) {
  const handleSearchChange = ({ target }) => {
    onSearchChange(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); 
  };

  return (
    <form onSubmit={handleSubmit} id="searchBarForm">
      <input
        type="text"
        id="searchBarInputText"
        name="searchBar"
        onChange={handleSearchChange}
        placeholder="Search songs..."
        value={search}
        onKeyDown={event => {
            if(event.key === "Enter"){
                handleSubmit(event);
            }
        }}
      />
      <input type="submit" id="searchSubmitButton" value="Submit" />
    </form>
  );
}

export default SearchBar;
