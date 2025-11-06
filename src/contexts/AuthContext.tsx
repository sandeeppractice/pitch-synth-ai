import React, { createContext, useContext, useState } from "react";

interface User {
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name: string, phone?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = (email: string, password: string, name: string, phone?: string) => {
    // Basic validation
    if (!email || !password || !name) return false;
    
    // Store user
    setUser({ email, name, phone });
    return true;
  };

  const login = (email: string, password: string) => {
    // Basic validation
    if (!email || !password) return false;
    
    // Mock login - in real app would validate credentials
    setUser({ email, name: "User" });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
