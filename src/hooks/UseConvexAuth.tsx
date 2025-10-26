import { useAuthActions } from '@convex-dev/auth/react';
import { useConvexAuth } from 'convex/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate } from 'react-router-dom';

type Role = 'admin' | 'coach' | 'client' | null;

interface AuthContextType {
  userRole: Role;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  user: unknown;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (email: string, password: string) => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();
  const navigate = useNavigate();

  // Get current user data
  const user = useQuery(api.users.currentUser);

  const isLoggedIn = isAuthenticated && !isLoading;
  const userRole: Role = 'admin'; // Default to admin for now, since we don't have role in schema

  const login = () => {
    // This is handled by signInWithPassword
  };

  const logout = async () => {
    try {
      await signOut();
      navigate('/sign-in', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const signInWithPassword = async (email: string, password: string) => {
    try {
      await signIn('password', { email, password });
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error('Credenciales inválidas');
    }
  };

  const signUpWithPassword = async (email: string, password: string) => {
    try {
      await signIn('password', { email, password, flow: 'signUp' });
    } catch (error) {
      console.error('Sign up error:', error);
      throw new Error('Error al crear la cuenta');
    }
  };

  return {
    userRole,
    login,
    logout,
    isLoggedIn,
    user: isLoading ? undefined : user,
    signInWithPassword,
    signUpWithPassword,
  };
};
