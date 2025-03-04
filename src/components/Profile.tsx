import { useAppSelector } from "../redux/hooks";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">No has iniciado sesión</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* Imagen de usuario */}
          <img
            src={`https://ui-avatars.com/api/?name=${user.email}&background=random`}
            alt="Avatar"
            className="w-24 h-24 rounded-full shadow-lg"
          />

          <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
            {user.email}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            
          </p>

          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
