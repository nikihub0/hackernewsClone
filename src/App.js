import React, { useState, useEffect } from "react";
import "./App.css";
import { FiLoader } from "react-icons/fi";

function App() {
  const [search, setSearch] = useState(null);
  const [topic, setTopic] = useState("react");
  const [information, setInformation] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://hn.algolia.com/api/v1/search?query=${topic}&page=${page}`)
      .then((response) => response.json())
      .then((json) => {
        setInformation(json.hits); 
        setIsLoading(false);
      }).catch((error)=> console.log(error))
  }, [topic, page]);

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  };
  /* const items = information.filter((data) => {
    if (search == null) return data;
     if (data.title.toLowerCase().includes(search.toLowerCase())) {
      return data;
    } */

  const items =
    information &&
    information.map((data) => {
      return (
        <div>
          <ul>
            <li>
              <a href={data.url}>
                <span>{data.title}</span>
              </a>
            </li>
          </ul>
        </div>
      );
    });

  return (
    <>
      {isLoading && (
        <div className="loading">is loading... <FiLoader />
        </div>
      )}
        <div className="searchbar">
          <input
            type="text"
            placeholder="Enter item to be searched "
            onChange={(e) => searchSpace(e)}
          />
          <button className="search" onClick={(e) => setTopic(search)}>
            Search
          </button>
          <button className="prev" 
          disabled={page === 1}
          onClick={(e) => setPage(page - 1)}>
            Previous page
          </button>
          <div className="page">{page}</div>
          <button className="next" onClick={(e) => setPage(page + 1)}>
            Next page
          </button>
        </div>
        <div className="content">{!isLoading && items}</div>
    </>
  );
}

export default App;
