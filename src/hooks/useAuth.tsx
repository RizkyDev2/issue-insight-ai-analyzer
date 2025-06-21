
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'Peneliti';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Simulate user data - in real app, validate token with backend
      setUser({
        id: '1',
        name: 'Administrator',
        email: 'admin@example.com',
        role: 'ADMIN'
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login - in real app, make API call
    const mockUser: User = {
      id: '1',
      name: 'Administrator',
      email: email,
      role: 'ADMIN'
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('auth-token', 'mock-jwt-token');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth-token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
