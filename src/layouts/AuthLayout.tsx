import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";
import React from "react";
import PermissionDeniedAlert from "../components/PermissionDeniedAlert";

interface AuthLayoutProps {
  requiredPermissions?: string[];
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  requiredPermissions = [],
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasPermission = user?.roles.map((rs) =>
    rs.role.RolePermission.some((Rolepem) =>
      requiredPermissions.includes(Rolepem.permission.name)
    )
  );

  if (!user || hasPermission?.includes(false)) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {hasPermission?.includes(false) && (
        <PermissionDeniedAlert message="No tienes permisos suficientes para acceder a esta sección." />
      )}
      <Outlet />
    </>
  );
};

export default AuthLayout;
