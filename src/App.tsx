import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WelcomePage from "./pages/WelcomePage";
import AdminProductPage from "./pages/adminProductPage";
import ProtectedRoute, { ProtectedAdminRoute } from "./components/ProtectedRoute";

function App() {
  return (
    //behållare för appens sidor med route path till login
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/AdminProductPage" element={<AdminProductPage />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;