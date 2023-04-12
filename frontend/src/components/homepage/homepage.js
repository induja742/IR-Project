import React, { useState } from "react";
import axios from "axios";
import "./homepage.css";
import {url} from "../../backendUrl.js";
import SearchList from "../searchlist/searchlist"

const Homepage = () => {
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  function makeQuery(e) {
    e.preventDefault();
    setShowResults(true);
  }
  return (
    <div>
      {showResults ? <SearchList query = {query} /> : <>
      <div className="body-background">
        <div className="xyz">
          <div className="search-bar">
            {/* <button className="button-styling">Recall</button>
            <button className="button-styling">Boolean</button>
            <button className="button-styling">Retreival</button> */}
            <button className="button-styling">Biword</button>
            <button className="button-styling">Normalization</button>
            <button className="button-styling">Tokenization</button>
            <button className="button-styling">Design systems</button>
            <button className="button-styling">Retreival</button>
            <button className="button-styling">Boolean</button>
            <button className="button-styling" id="bg-change">Explore</button>
           
            </div>
          <div className="abc">
          <button className="button-styling">Recall</button>
          <button className="button-styling">Soundex</button>
            <button className="button-styling">Hash Tables</button>
            <button className="button-styling">Stemming</button>
           
          </div>
         
          <br></br>
          <h2>What are you looking for?</h2>
          <form onSubmit={makeQuery}>
          <input
            className="home-body-input"
            type="text"
            placeholder="Search...."
            onChange={(e)=>{setQuery(e.target.value)}}
          />
          </form>
        </div>
      </div>
    </>}
    </div>
  );
};

export default Homepage;