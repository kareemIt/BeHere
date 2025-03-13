"use client";
import { usePathname } from "next/navigation";
import { UserProvider } from "./context/UserContext";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navBar/NavBar";
import "./components/navBar/style.css";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <UserProvider>
          {pathname !== "/login" && pathname !== "/register" && pathname !== "/"&&
           <NavBar />}
          {children}
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
