import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../service/authService";

function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  //om användaren loggas in så säger outlet att visa den skyddade route som matchar url:en
  return <Outlet />;
}

export default ProtectedRoute;
