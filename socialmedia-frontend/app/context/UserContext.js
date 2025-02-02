import { createContext, use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect( () => {
    const fetchData = async () => {
      let localToken = localStorage.getItem('jwtToken');
      const response = await  fetch('http://localhost:8080/api/secured-endpoint', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('localToken:', localToken);
      console.log('responses:', response);
      if (response.ok) {
        console.log('Token found:', localToken);
        router.push('/routes/home');
        setUserId(localStorage.getItem('userId')); 
      } else {
        router.push('/routes/login');
        console.error('Failed to fetch data',response.status);
      }
    }

    fetchData();
  }, [token]);

  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
