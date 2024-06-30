"use client";
import { UserProvider } from './context/UserContext'; // Adjust the path as necessary
import { Inter } from "next/font/google";
import "./globals.css";
const RootLayout = ({ children }) => {
  return (
    <UserProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </UserProvider>
  );
};

export default RootLayout;
