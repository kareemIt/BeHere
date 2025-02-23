"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './style.css';
import UserContext from '../../context/UserContext';

const Search = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [userInput, setUserInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async () => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`http://localhost:8080/api/search/${userInput}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      setSearchResults(data);
    } else {
      console.error('Error fetching search results');
    }
  };

  useEffect(() => {
    if (userInput) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [userInput]);

  return (
    <div className='Search-container'>
      <input
        className="searchBar"
        placeholder='Search'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className='Search-results'>
        {searchResults.slice(0,5).map((result) => (
          <div key={result.userId}>
            <Link href={`/routes/profile/${result.username}?userId=${result.userId}`}>
              <p>{result.username}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;