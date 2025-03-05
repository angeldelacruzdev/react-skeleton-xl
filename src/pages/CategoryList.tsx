import { useState } from "react";
import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../redux/api/categoryApi";
import { toast } from "react-hot-toast";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const CategoryList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetCategoriesQuery({ page, search });
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editing, setEditing] = useState<number | null>(null);
  const [newName, setNewName] = useState("");

  const handleUpdate = async (id: number) => {
    try {
      await updateCategory({ id, name: newName }).unwrap();
      toast.success("Categoría actualizada");
      setEditing(null);
    } catch {
      toast.error("Error al actualizar");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar esta categoría?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Categoría eliminada");
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  if (isLoading) return <p className="text-center">Cargando categorías...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Lista de Categorías
      </h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar categoría..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
      />

      <ul className="space-y-2">
        {data?.categories.map((category: any) => (
          <li
            key={category.id}
            className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            {editing === category.id ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-2 py-1 w-full rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
              />
            ) : (
              <span className="text-gray-900 dark:text-white">
                {category.name}
              </span>
            )}

            <div className="flex space-x-2">
              {editing === category.id ? (
                <button
                  onClick={() => handleUpdate(category.id)}
                  className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditing(category.id);
                    setNewName(category.name);
                  }}
                >
                  <PencilIcon className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                </button>
              )}
              <button onClick={() => handleDelete(category.id)}>
                <TrashIcon className="w-5 h-5 text-red-600 hover:text-red-800" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-lg disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-900 dark:text-white">Página {page}</span>
        <button
          disabled={!data?.hasMore}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-lg disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
