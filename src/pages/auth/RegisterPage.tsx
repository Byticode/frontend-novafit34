import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    form: '',
  });
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      form: '',
    };
    let hasError = false;

    // Validaciones
    if (!fullName) {
      newErrors.fullName = 'El nombre completo es requerido.';
      hasError = true;
    }
    if (!email) {
      newErrors.email = 'El correo electrónico es requerido.';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido.';
      hasError = true;
    }
    if (!password) {
      newErrors.password = 'La contraseña es requerida.';
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
      hasError = true;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña.';
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    // registrar usuario (simulado)
    console.log('Registrando usuario:', { fullName, email, password });

    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
      <div className="w-full flex justify-start mb-6">
        <span className="text-2xl font-bold text-white ml-8">Novafit34</span>
      </div>
      <div className="p-6 md:p-10 w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Crea tu cuenta
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Nombre Completo */}
          <div className="relative">
            <User
              className="absolute left-3 top-6 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tu nombre completo"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrors((prev) => ({ ...prev, fullName: '' }));
              }}
              className={`w-full p-3 pl-10 rounded-lg bg-blue-primary text-white placeholder-gray-400 border-2 ${
                errors.fullName ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div className="relative">
            <Mail
              className="absolute left-3 top-6 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
              className={`w-full p-3 pl-10 rounded-lg bg-blue-primary text-white placeholder-gray-400 border-2 ${
                errors.email ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-6 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: '' }));
              }}
              className={`w-full p-3 pl-10 rounded-lg bg-blue-primary text-white placeholder-gray-400 border-2 ${
                errors.password ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-6 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: '' }));
              }}
              className={`w-full p-3 pl-10 rounded-lg bg-blue-primary text-white placeholder-gray-400 border-2 ${
                errors.confirmPassword ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botón de Registro */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Registrarse
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/sign-in"
              className="text-indigo-400 hover:text-indigo-500 font-bold"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
