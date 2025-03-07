import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../redux/api/userApi";
import { useGetRolesQuery } from "../../redux/api/rolesApi";
import { useGetPermissionsQuery } from "../../redux/api/ermissionsApi";

// Esquema de validación con Yup
const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  role: yup.string().required("Debe seleccionar un rol"),
});

const UserForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const { data: roles, isLoading: isRolesLoading } = useGetRolesQuery({});
  const { data: permissions, isLoading: isPermissionsLoading } =
    useGetPermissionsQuery({});

  const handlePermissionChange = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creando usuario...");
    try {
      await createUser({ ...data, permissions: selectedPermissions }).unwrap();
      toast.success("Usuario creado correctamente", { id: toastId });
      onClose();
    } catch (error) {
      toast.error("Error al crear el usuario", { id: toastId });
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email")}
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white 
              ${errors.email ? "border-red-500" : "border-gray-300"} 
              focus:border-blue-500 focus:ring focus:ring-blue-200`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white 
              ${errors.password ? "border-red-500" : "border-gray-300"} 
              focus:border-blue-500 focus:ring focus:ring-blue-200`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Selección de Roles */}
        <div>
          <select
            {...register("role")}
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white 
              ${errors.role ? "border-red-500" : "border-gray-300"} 
              focus:border-blue-500 focus:ring focus:ring-blue-200`}
            disabled={isRolesLoading}
            onChange={(e) => setValue("role", e.target.value)}
          >
            <option value="">Seleccione un rol</option>
            {roles?.map((r: any) => (
              <option key={r.id} value={r.name}>
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
                    value={p.id}
                    checked={selectedPermissions.includes(p.id)}
                    onChange={() => handlePermissionChange(p.id)}
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

export default UserForm;
