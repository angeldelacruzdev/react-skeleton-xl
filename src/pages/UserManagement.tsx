import { useState } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../redux/api/userApi";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import UserForm from "../components/users/UserForm";
import ReusableModal from "../components/ReusableModal";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetUsersQuery({ search, page });
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleDelete = async () => {
    if (!selectedUserId) return;
    try {
      await deleteUser(selectedUserId).unwrap();
      toast.success("Usuario eliminado correctamente");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error al eliminar el usuario");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Usuarios
        </h2>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setSelectedUser(null);
            setIsUserModalOpen(true);
          }}
        >
          <PlusCircleIcon className="w-5 h-5" /> Nuevo Usuario
        </button>
      </div>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Cargando usuarios...
        </p>
      ) : isError ? (
        <p className="text-center text-red-500">
          Error al cargar los usuarios.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
                <th className="p-2">Email</th>
                <th className="p-2">Date</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((user: any) => (
                <tr key={user.id} className="border-b dark:border-gray-600">
                  <td className="p-2 dark:text-white">{user.email}</td>
                  <td className="p-2 dark:text-white">{user.createdAt}</td>
                  <td className="p-2 flex justify-center gap-4">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 dark:text-red-400"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
              disabled={!data?.nextPage}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Usuario"
        description="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmColor="bg-red-500 hover:bg-red-600"
        variant="danger"
      />
      <ReusableModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title="Crear Usuario"
      >
        <UserForm onClose={() => setIsUserModalOpen(false)} />
      </ReusableModal>
    </div>
  );
};

export default UserList;
