'use client';
import { UserProvider } from './context/UserContext'; // Adjust the path as necessary
import react, {useEffect} from 'react';
import { useRouter } from "next/navigation";

function MyApp({ Component, pageProps }) {
  const router = useRouter();


  useEffect(() => {
    router.push('/routes/login');
  }, []);
  return (
    <UserProvider>
      <p>hey</p>
    </UserProvider>
  );
}

export default MyApp;
