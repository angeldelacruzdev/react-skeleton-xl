import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/api/authApi";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import DarkModeToggle from "../components/DarkModeToggle";
import { useDarkMode } from "../hooks/useDarkMode";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login({ email, password }).unwrap();
      dispatch(setUser(user));
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="mb-6 text-center">
            <DarkModeToggle
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
            Iniciar Sesión
          </h2>

          {error && (
            <p className="mb-4 rounded-md bg-red-500 p-2 text-center text-sm text-white">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500"
                required
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500"
                required
              />
            </div>

            {/* Botón de Iniciar Sesión */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center"
            >
              {isLoading ? <Spinner /> : "Ingresar"}
            </button>
          </form>

          {/* Pie de Página */}
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
