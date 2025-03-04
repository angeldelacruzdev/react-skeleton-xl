import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginForm from "../pages/Login";
import { Dashboard } from "../pages";
import { useAppDispatch } from "../redux/hooks";
import { useEffect, useState } from "react";
import { setUser } from "../redux/slices/authSlice";
import AuthLoader from "../components/AuthLoader";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import Profile from "../components/Profile";

const AppRoutes = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  // Simular la carga del usuario autenticado desde el almacenamiento local
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }

      setTimeout(() => setLoading(false), 600); // Simula un pequeño delay
    };

    fetchUser();
  }, [dispatch]);

  if (loading) return <AuthLoader />; // 🔥 Mostrar el Loader global si está cargando

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<AuthLayout  requiredPermissions={["dashboard"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
