import React, { createContext, useContext, useState } from 'react';

type Role = 'admin' | 'coach' | 'client' | null;

interface AuthContextType {
  userRole: Role;
  login: (role: Role) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userRole, setUserRole] = useState<Role>(null);
  const isLoggedIn = userRole !== null;

  const login = (role: Role) => {
    // Aquí se guardaría el token o la sesión
    setUserRole(role);
  };

  const logout = () => {
    // Aquí se limpiaría el token o la sesión
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout, isLoggedIn }}>
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