// utils.js
const currentDate = () => {
    const date = new Date(); 
    const current = date.toISOString().slice(0, 19).replace('T', ' ');
    return current;
  };
  
  const expirationDate = () => {
    const date = new Date(); 
    date.setDate(date.getDate() + 1); 
    const expiration = date.toISOString().slice(0, 19).replace('T', ' ');
    return expiration;
  };
  
  export { currentDate, expirationDate };
  