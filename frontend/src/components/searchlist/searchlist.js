
import React, { useState } from 'react';
import './SearchBar.css';

function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([
    { title: 'Result 1', description: 'Description for result 1' },
    { title: 'Result 2', description: 'Description for result 2' },
    { title: 'Result 3', description: 'Description for result 3' },
    { title: 'Result 1', description: 'Description for result 1' },
    { title: 'Result 2', description: 'Description for result 2' },
    { title: 'Result 3', description: 'Description for result 3' },
    { title: 'Result 1', description: 'Description for result 1' },
    { title: 'Result 2', description: 'Description for result 2' },
    { title: 'Result 3', description: 'Description for result 3' },
  ]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Do a search here using the searchText state variable and update the searchResults state variable accordingly
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <div className="search-container">
      <div onSubmit={handleSearchSubmit}>
        <div className="search-bar">
          <span className="search-text-plain"> Results  </span>
          
          <input type="text" className="search-bar-input" placeholder="..." value={searchText}  onChange={handleSearchChange} /> 
          {searchText.length > 0 && (
            <span className="search-bar-clear" onClick={handleClearSearch}><i className="fa-sharp fa-solid fa-xmark"></i></span>
          )}
          <button type="submit" className="search-bar-submit"><i className="fas fa-search"></i></button>
          <div className="search-bar-all-documents">
          <span className="search-bar-all-documents-text"> <i className="fas fa-search"></i>All Documents</span>
          </div>
          <hr style={{ width: '100%' }}/>
        </div>
      </div>
     
      {searchResults.length > 0 && (
        <div className="search-results-container">
          {searchResults.map((result, index) => (
            <div className="search-result" key={index}>
              <div className="search-result-title">{result.title}</div>
              <div className="search-result-description">{result.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;