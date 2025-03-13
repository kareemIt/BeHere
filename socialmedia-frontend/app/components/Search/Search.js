"use client";

import React, { useEffect, useRef, useState, useContext } from 'react';
import Link from 'next/link';
import './style.css';
import UserContext from '../../context/UserContext';

const Search = () => {
  const [userInput, setUserInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const containerRef = useRef(null);
  const { fetchWithToken } = useContext(UserContext);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSearch = async () => {
    const trimmedInput = userInput.trim();
    
    // Prevent API call if input is empty or only spaces
    if (trimmedInput.length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetchWithToken(`${BACKEND_URL}/search/${trimmedInput}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Error fetching search results');
      }
    } catch (error) {
      console.error('Search operation failed');
    }
  };

  useEffect(() => {
    if (userInput.trim().length > 0) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [userInput]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="Search-container" ref={containerRef}>
      <input
        className="searchBar"
        placeholder="Search"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onFocus={() => {
          if (userInput.trim().length > 0) {
            handleSearch();
          }
        }}
      />
      <div className="Search-results">
        {searchResults.slice(0, 5).map((result) => (
          <div key={result.userId}>
            <Link 
              href={`/${result.username}?userId=${result.userId}`}
              onClick={() => {
                setSearchResults([]);
                setUserInput('');
              }}
            >
              <p>{result.username}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
