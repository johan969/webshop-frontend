import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../types/authType";

// Tar nu emot user från App istället för att kontrollera sessionStorage
type ProtectedRouteProps = {
  user: User | null;
};

function ProtectedRoute({ user }: ProtectedRouteProps) {

  // Kontrollerar om användaren finns i React-state
  // Om user är null skickas användaren till login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //om användaren loggas in så säger outlet att visa den skyddade route som matchar url:en
  return <Outlet />;
}

export function ProtectedAdminRoute({ user }: ProtectedRouteProps) {

  // Hämtar nu användarens roller från user istället för sessionStorage
  const roles = user?.roles ?? [];

  //om användaren inte har rollen admin så skickas den till welcome sidan
  if (!roles.includes("ROLE_ADMIN")) {
    window.alert("Du har inte behörighet att se denna sida.");
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;