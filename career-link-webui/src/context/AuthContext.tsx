
"use client"; 
import React, { createContext, useContext, useState, useEffect } from "react";
import { json } from "stream/consumers";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, recruiter: boolean) => void;
  fullName: string;
  isRecruiter: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isRecruiter, setRecruiter] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setIsAuthenticated(true);
      const { firstName, lastName, isRecruiter } = JSON.parse(storedUser);
      setFullName(`${firstName} ${lastName}`);
      setRecruiter(isRecruiter);
    }
  }, []);

  const login = (user: string, recruiter: boolean) => {
    setFullName(user);
    setIsAuthenticated(true);
    setRecruiter(recruiter);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isRecruiter, fullName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
