import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { IStore } from "../interfaces/store";

const ProtectedRoute: React.FC = () => {
  const { data: currentUser } = useSelector((store: IStore) => store.loginUser);
  console.log("currentUser", currentUser);

  if (!currentUser?.token) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
