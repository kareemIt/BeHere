const checkTokenExpiration = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('jwtToken');
          return false;
        }
        return true;
      } catch (error) {
        console.error('Invalid token:', error);
        return false;
      }
    }
    return false;
  };
  
  export default checkTokenExpiration;  // This is important, make sure it's exported as default
  