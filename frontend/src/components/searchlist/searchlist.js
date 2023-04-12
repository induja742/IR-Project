import axios from "axios";
import { url } from '../../backendUrl';
import React, { useEffect, useState } from 'react';
import './searchlist.css';

function Search({query}) {
  const [result, setResult] = useState();
  const [newQuery, setNewQuery] = useState(query);
  const [input, setInput] = useState(query)
  function makeQuery(e) {
    e.preventDefault();
    console.log("I'm triggered");
    axios.post(`${url}/search`, {
      query: input
    })
      .then(response=>{
        if(!response.data.success) {
          alert("Something went wrong, try again later");
          return;
        }
        console.log(response)
        setResult(response.data.matchedDocuments)
        
      })
      .catch(err=>{
        console.log(err)
        alert("Something went wrong, try again later");
      })
  }
  useEffect(()=>{
    axios.post(`${url}/search`, {
      query: query
    })
      .then(response=>{
        if(!response.data.success) {
          alert("Something went wrong, try again later");
          return;
        }
        console.log(response)
        setResult(response.data.matchedDocuments)
        
      })
      .catch(err=>{
        console.log(err)
        alert("Something went wrong, try again later");
      })
  },[query])
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
      <form onSubmit={makeQuery}>
        <div className="search-bar">
          <span className="search-text-plain"> Results  </span>
            <input type="text" className="search-bar-input" placeholder="..." value={input}  onChange={(e)=>{setInput(e.target.value)}} /> 
          {searchText.length > 0 && (
            <span className="search-bar-clear" onClick={handleClearSearch}><i className="fa-sharp fa-solid fa-xmark"></i></span>
          )}
          <button type="submit" className="search-bar-submit"><i className="fas fa-search"></i></button>
          <div className="search-bar-all-documents">
          <span className="search-bar-all-documents-text"> <i className="fas fa-search"></i>All Documents</span>
          </div>
          <hr style={{ width: '100%' }}/>
        </div>
      </form>
     
      {result && (
        <div className="search-results-container">
          {result.map((currResult, index) => (
            <div className="search-result" key={index}>
              <a href={`${url}/viewDocument/${currResult.path_to_doc}`} className="search-result-title">{currResult.title || currResult.body.substring(0,50)}</a>
              <div className="search-result-description">{currResult.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;