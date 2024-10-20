
"use client"; // 添加这一行
import React, { createContext, useContext, useState, useEffect } from "react";

// 定义 AuthContext 的类型
interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

// 创建一个 AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider 组件：用于在整个应用中提供 AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // 检查 localStorage 中是否有用户信息，保持登录状态
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: string) => {
    localStorage.setItem("user", user);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 hook：用于访问 AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
