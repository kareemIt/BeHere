"use client";

import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import UserContext from "../context/UserContext";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { userId, setUserId } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const localToken = localStorage.getItem("accessToken");
      if (!userId) {
        if (localToken) {
          try {
            const decoded = jwtDecode(localToken);
            if (decoded && decoded.sub) {
              setUserId(decoded.userId);
              setLoading(false);
            } else {
              router.push("/login");
            }
          } catch (error) {
            router.push("/login");
          }
        } else {
          router.push("/login");
        }
      } else {
        setLoading(false);
      }
    }, [userId, router, setUserId]);

    if (loading) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;