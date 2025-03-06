import { useState } from "react";
import { useCreateCategoryMutation } from "../../redux/api/categoryApi";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    try {
      await createCategory({ name }).unwrap();
    } catch (err) {
      setError("Error al crear la categoría.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Crear Categoría
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Creando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
