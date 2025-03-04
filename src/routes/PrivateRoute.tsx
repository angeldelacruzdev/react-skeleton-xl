import { Navigate } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
