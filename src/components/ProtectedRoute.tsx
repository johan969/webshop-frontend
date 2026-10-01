import { Navigate, Outlet,  } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../service/authService";



function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  //om användaren loggas in så säger outlet att visa den skyddade route som matchar url:en
  return <Outlet />;
}



export function ProtectedAdminRoute() {
  const roles: string[] = getCurrentUser()?.roles;

  //om användaren inte har rollen admin så skickas den till welcome sidan
  if (!roles.includes("ROLE_ADMIN")) {
    window.alert("Du har inte behörighet att se denna sida.");
    return <Navigate to="/welcome" replace />;
  } 
  

  return <Outlet />;
}

export default ProtectedRoute;
