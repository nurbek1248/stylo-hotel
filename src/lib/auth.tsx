import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, provider: 'email' | 'google' | 'apple') => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('stylo-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, provider: 'email' | 'google' | 'apple') => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newUser: User = {
        email,
        name: email.split('@')[0],
        avatar: provider === 'google' ? 'https://ui-avatars.com/api/?name=' + email : undefined,
        role: email === 'Nurbek1348@gmail.com' && provider === 'google' ? 'admin' : 'user'
      };
      setUser(newUser);
      localStorage.setItem('stylo-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stylo-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
