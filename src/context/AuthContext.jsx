import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // Export the custom hook

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};