import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    //behållare för appens sidor med route path till login
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
    </Routes>
  );
}

export default App;
