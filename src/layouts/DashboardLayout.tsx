import { useState } from "react";
import { Link, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";

import { useDarkMode } from "../hooks/useDarkMode";
import { Bars3Icon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/solid"; // Importar iconos
import DarkModeToggle from "../components/DarkModeToggle";
import LogoutButton from "../components/LogoutButton";

const DashboardLayout = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la apertura del sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Alternar el estado del sidebar
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 dark:bg-gray-900">
      {/* Botón de Menú Hamburguesa */}
      <div className="flex items-center justify-end">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-4 text-gray-800 dark:text-white"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
      {/* Sidebar */}
      <aside
        className={`fixed inset-0 z-50 bg-white dark:bg-gray-800 p-6   lg:static lg:block transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between ">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Dashboard
          </h2>

          <button
            onClick={toggleSidebar}
            className="lg:hidden p-4 text-gray-800 dark:text-white"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.email}&background=random`}
            alt="Avatar"
            className="w-20 h-20 rounded-full border-2 border-gray-600"
          />
          <h2 className="text-lg font-semibold mt-2 dark:text-white">{user?.email}</h2>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition dark:text-white"
              >
                <UserIcon className="w-6 h-6" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition dark:text-white"
              >
                <UserIcon className="w-6 h-6" />
                <span>Perfil</span>
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition dark:text-white"
              >
                <UserIcon className="w-6 h-6" />
                <span>Categorias</span>
              </Link>
            </li>
            <li>
              <Link
                to="/configuracion"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition dark:text-white"
              >
                <Cog6ToothIcon className="w-6 h-6" />
                <span>Configuración</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botón de cerrar sesión */}
       <LogoutButton className= "mt-7"  />
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 ">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Bienvenido, {user?.email || "Usuario"} 👋
          </h1>

          <div className="flex items-center gap-4">
            {/* Botón de modo oscuro */}
            <DarkModeToggle
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />

            {/* Botón de Cerrar Sesión */}
            <LogoutButton />
          </div>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
