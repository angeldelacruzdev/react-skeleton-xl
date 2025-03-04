import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";

interface Props {
  className?: string;
}

const LogoutButton = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={` ${className} text-white bg-blue-700 w-full   flex items-center justify-center gap-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
      onClick={() => dispatch(logout())}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
        />
      </svg>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
