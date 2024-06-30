import { UserProvider } from './context/UserContext'; // Adjust the path as necessary

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
