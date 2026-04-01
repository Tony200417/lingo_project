import { useState } from 'react';
import { Lock, User, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { LingoIcon } from './LingoIcon';

interface LoginProps {
  onLogin: (username: string) => void;
}

const ALLOWED_USERS = {
  'josebac2004': 'lacryz2004A$',
  'ssamirache2003': 'ssamiraxiomara2003X$'
};

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validPassword = ALLOWED_USERS[username as keyof typeof ALLOWED_USERS];
    
    if (validPassword && validPassword === password) {
      onLogin(username);
    } else {
      setError('Credenciales incorrectas. Espacio privado.');
    }
  };

  return (
    <div className="min-h-screen bg-indigo-600 dark:bg-indigo-950 flex items-center justify-center p-4 transition-colors duration-200">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/10"
      >
        <div className="flex flex-col items-center mb-8">
          <LingoIcon size={64} className="mb-4" />
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">LingoFast Privado</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Acceso exclusivo para Jose y Samira</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
                placeholder="Tu usuario"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:text-white"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
          >
            Entrar a LingoFast
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Desarrollado con Gemini AI & Firebase
        </p>
      </motion.div>
    </div>
  );
}
