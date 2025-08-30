import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoutes = () => {
  const  userInfo  = useSelector((state) => state.auth.userInfo);
  return (userInfo ? <Outlet /> : <Navigate to="/login" replace />);
};

export default AuthRoutes;