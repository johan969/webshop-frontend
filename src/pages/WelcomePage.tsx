import { getCurrentUser, isAuthenticated } from "../service/authService";
import { Navigate } from "react-router-dom";

function WelcomePage() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  //hämtar objektet (dvs user+info) som sparades vid login
  const user = getCurrentUser();

  //gör så att det bara står User eller Admin i role, istället för ROLE_USER, ROLE_ADMIN
  function formatRole(role: string) {
    const roleName = role.replace("ROLE_", "").toLowerCase();
    return roleName.charAt(0).toUpperCase() + roleName.slice(1);
  }

  return (
    <main>
      <h1>Välkommen {user?.username}!</h1>
      <p>Roll: {user?.roles.map(formatRole).join(", ")}</p>
    </main>
  );
}

export default WelcomePage;
