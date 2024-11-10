import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthContextType {
  isLoggedIn: boolean;
  logout: () => void;
  userId?: string;
  token?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | undefined>(
    localStorage.getItem("userId") || undefined
  );
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem("token") || undefined
  );

  const logout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    setUserId(undefined);
    setToken(undefined);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const token = await user.getIdToken();

        setIsLoggedIn(true);
        setUserId(userId);
        setToken(token);

        // Save to local storage
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
      } else {
        logout();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, userId, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
