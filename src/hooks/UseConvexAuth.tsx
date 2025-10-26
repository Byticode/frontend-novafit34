import { useState, useEffect } from 'react';

type Role = 'admin' | 'coach' | 'client' | null;

interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
}

interface AuthContextType {
  userRole: Role;
  login: (role: Role) => void;
  logout: () => void;
  isLoggedIn: boolean;
  user: User | null;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (email: string, password: string) => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const userRole: Role = user?.role || null;

  const login = (role: Role) => {
    // Create a mock user for now
    const mockUser: User = {
      id: '1',
      email: 'admin@novafit34.com',
      name: 'Admin User',
      role: role || 'admin',
    };
    setUser(mockUser);
    setIsLoggedIn(true);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  };

  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('auth_user');
  };

  const signInWithPassword = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email: email,
        name: 'User',
        role: 'admin',
      };
      setUser(mockUser);
      setIsLoggedIn(true);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signUpWithPassword = async (email: string, password: string) => {
    // Mock registration - in real app, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        email: email,
        name: 'New User',
        role: 'admin',
      };
      setUser(mockUser);
      setIsLoggedIn(true);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid registration data');
    }
  };

  return {
    userRole,
    login,
    logout,
    isLoggedIn,
    user,
    signInWithPassword,
    signUpWithPassword,
  };
};
