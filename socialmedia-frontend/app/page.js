import { UserProvider } from './context/UserContext'; // Adjust the path as necessary
import NavBar from './components/navBar/NavBar'; // Adjust the path as necessary
import styles from './components/navBar/style'; // Adjust the path as necessary

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <NavBar />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
