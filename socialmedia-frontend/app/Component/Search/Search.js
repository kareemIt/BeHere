"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import follow from '../../utils/follow';
import like from '../../utils/like';

const Search = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [userInput, setUserInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem('jwtToken');

  const handleSearch = async () => {

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
        placeholder='Search'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className='Search-results'>
        {searchResults.slice(0,5).map((result) => (
          <div key={result.userId}>
            <Link href={`/routes/profile/${result.userId}`}>
              <p>{result.username}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;