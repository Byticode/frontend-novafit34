import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/UseAuth.tsx';

type UserRole = 'admin' | 'coach' | 'client';

interface DummyUser {
  password: string;
  role: UserRole;
}

const DUMMY_USERS: Record<string, DummyUser> = {
  'admin@novafit.com': { password: 'password123', role: 'admin' },
  'coach@novafit.com': { password: 'password123', role: 'coach' },
  'client@novafit.com': { password: 'password123', role: 'client' },
};

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* const [rememberMe, setRememberMe] = useState(false); */
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

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

    if (hasError) return;

    // Simulación de validación de credenciales
    const user = DUMMY_USERS[email as keyof typeof DUMMY_USERS];

    if (user && user.password === password) {
      if (user.role === 'admin') {
        login(user.role);
        navigate('/admin/dashboard', { replace: true });
      } else {
        newErrors.form =
          'Solo administradores pueden iniciar sesión por ahora.';
        setErrors(newErrors);
      }
    } else {
      newErrors.form = 'Correo o Contraseña incorrecta.';
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6 flex justify-center mb-6">
        <span className="text-2xl font-bold text-white">Novafit34</span>
      </div>
      <div className="p-6 md:p-10 w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Bienvenido
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Campo de Correo/Usuario */}
          <div className="relative mb-10">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 pl-10 rounded-lg bg-blue-primary text-white placeholder-gray-400 border-2 ${
                errors.email ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 pl-10 rounded-lg bg-blue-primary text-white placeholder-gray-400 border-2 ${
                errors.password ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
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
              className="text-sm font-medium text-gray-400 hover:text-indigo-400"
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
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors hover:cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Enlace para ir a la página de registro */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            ¿No tienes una cuenta?{' '}
            <a
              href="/register"
              className="text-indigo-400 hover:text-indigo-500 font-bold"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
