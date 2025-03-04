// components/PermissionDeniedAlert.tsx
import React from "react";

interface PermissionDeniedAlertProps {
  message: string;
}

const PermissionDeniedAlert: React.FC<PermissionDeniedAlertProps> = ({
  message,
}) => {
  return (
    <div className="bg-red-500 text-white p-4 rounded-md">
      <h2 className="font-bold">Acceso Denegado</h2>
      <p>{message}</p>
    </div>
  );
};

export default PermissionDeniedAlert;
