const SearchBar = ({ onSearch }) => {
  return (
    <div className="searchBar-container">
      <div className="search-bar">
        <div className="textfieldclass">
          <p className="addcity"></p>
        </div>
        <button className="searchButton">Add City</button>
      </div>
    </div>
  );
};

export default SearchBar;
