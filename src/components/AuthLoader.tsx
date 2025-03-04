import Spinner from "./Spinner";

const AuthLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <Spinner />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Cargando datos...
        </p>
      </div>
    </div>
  );
};

export default AuthLoader;
