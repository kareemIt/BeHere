import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null); // Added username state
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('jwtToken') != null) {
        let localToken = localStorage.getItem('jwtToken');
        const response = await fetch('http://localhost:8080/api/secured-endpoint', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          // Retrieve userId and username from localStorage
          setUserId(localStorage.getItem('userId'));
          setUsername(localStorage.getItem('username'));
        } else {
          router.push('/routes/login');
          console.error('Failed to fetch data', response.status);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
