// components/DarkModeToggle.tsx
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; // Asegúrate de tener estos iconos de Heroicons

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-full p-3 transition duration-300 ease-in-out ${
        isDarkMode
          ? "bg-yellow-500 hover:bg-yellow-400"
          : "bg-gray-200 border-2 border-gray-300 hover:bg-gray-300"
      }`}
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-white" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-800" />
      )}
    </button>
  );
};

export default DarkModeToggle;
