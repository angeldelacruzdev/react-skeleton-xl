import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

import { useGetRolesQuery } from "../../redux/api/rolesApi";
import { useGetPermissionsQuery } from "../../redux/api/ermissionsApi";
import { useUpdateUserMutation } from "../../redux/api/userApi";

interface EditUserRolesProps {
  user: any; // Datos del usuario a editar
  onClose: () => void;
}

// Esquema de validación
const schema = yup.object().shape({
  role: yup.string().required("Debe seleccionar un rol"),
  permissions: yup.array().of(yup.string()),
});

const EditUserRoles = ({ user, onClose }: EditUserRolesProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: user?.roles || "",
      permissions: user?.permissions?.map((p: any) => p),
    },
  });

  const { data: roles, isLoading: isRolesLoading } = useGetRolesQuery({});
  const { data: permissions, isLoading: isPermissionsLoading } =
    useGetPermissionsQuery({});
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Estado para manejar permisos seleccionados
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    user?.permissions?.map((p: any) => p) || []
  );

  useEffect(() => {
    setValue("permissions", selectedPermissions);
  }, [selectedPermissions, setValue]);

  const handlePermissionChange = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Actualizando usuario...");
    try {
      await updateUser({
        id: user.id,
        role: data.role,
        permissions: selectedPermissions,
      }).unwrap();
      toast.success("Usuario actualizado correctamente", { id: toastId });
      onClose();
    } catch (error) {
      toast.error("Error al actualizar el usuario", { id: toastId });
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Editar Usuario
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Selección de Roles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Rol:
          </label>
          <select
            {...register("role")}
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
              errors.role ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:ring focus:ring-blue-200`}
            disabled={isRolesLoading}
            onChange={(e) => setValue("role", e.target.value)}
          >
            <option value="">Seleccione un rol</option>
            {roles?.map((r: any) => (
              <option
                key={r.id}
                value={r.name}
                selected={r.name === user?.roles}
              >
                {r.name}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Selección de Permisos */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">
            Permisos:
          </h3>
          {isPermissionsLoading ? (
            <p className="text-gray-500 dark:text-gray-400">
              Cargando permisos...
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {permissions?.map((p: any) => (
                <label key={p.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={p.name}
                    checked={selectedPermissions.includes(p.name)}
                    onChange={() => handlePermissionChange(p.name)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-white">
                    {p.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg transition duration-200 hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 ${
              isSubmitting || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserRoles;
