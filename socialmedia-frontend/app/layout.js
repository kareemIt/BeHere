"use client";
import { usePathname } from "next/navigation";
import { UserProvider } from "./context/UserContext";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./component/navBar/NavBar";
import "./component/navBar/style.css";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <UserProvider>
          {pathname !== "/routes/login" && pathname !== "/routes/register" && <NavBar />}
          {children}
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
