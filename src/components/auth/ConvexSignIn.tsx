import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/UseConvexAuth';
import { AuthRedirect } from './AuthRedirect';

export const ConvexSignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signInWithPassword } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = { email: '', password: '', form: '' };
    let hasError = false;

    if (!email) {
      newErrors.email = 'El correo no puede estar vacío.';
      hasError = true;
    }
    if (!password) {
      newErrors.password = 'La contraseña no puede estar vacía.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      await signInWithPassword(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      console.error('Sign in error:', error);
      setErrors({
        ...newErrors,
        form: 'Correo o contraseña incorrectos.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthRedirect>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="absolute top-6 left-6 flex justify-center mb-6">
          <span className="text-2xl font-bold text-headline">Novafit34</span>
        </div>

        <div className="p-6 md:p-10 w-full max-w-md">
          <h2 className="text-center text-3xl font-bold text-headline mb-8">
            Bienvenido
          </h2>

          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Campo de Correo */}
            <div className="relative mb-10">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-headline"
                size={20}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 pl-10 rounded-lg bg-card-background text-headline placeholder-sub-headline border border-secondary/30! ${
                  errors.email ? 'border-red-500' : 'border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-highlight`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="absolute -bottom-6 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo de Contraseña */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-headline"
                size={20}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 pl-10 rounded-lg bg-card-background text-headline placeholder-sub-headline border border-secondary/30! ${
                  errors.password ? 'border-red-500' : 'border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-highlight`}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="absolute -bottom-6 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Enlace de Olvidó la Contraseña */}
            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm font-medium text-sub-headline hover:text-indigo-400"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Mensaje de error general */}
            {errors.form && (
              <p className="text-sm text-red-500 text-center">{errors.form}</p>
            )}

            {/* Botón de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-highlight text-headline font-bold py-3 px-4 rounded-lg hover:bg-highlight/70 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Enlace para ir a la página de registro */}
          <div className="text-center mt-6">
            <p className="text-sm text-sub-headline">
              ¿No tienes una cuenta?{' '}
              <Link
                to="/sign-up"
                className="text-indigo-400 hover:text-indigo-500 font-bold"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
};
