import { useProtectedDataQuery } from "../redux/api/authApi";

const ProtectedPage = () => {
  const { data, error, isLoading } = useProtectedDataQuery();

  if (isLoading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos</p>;

  return (
    <div>
      <h2>Datos Protegidos</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedPage;
