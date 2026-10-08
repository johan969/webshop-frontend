import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WelcomePage from "./pages/WelcomePage";
import AdminProductPage from "./pages/adminProductPage";
import ProtectedRoute, {
  ProtectedAdminRoute,
} from "./components/ProtectedRoute";
import CreateProductPage from "./pages/CreateProductPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    //behållare för appens sidor med route path till login
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/Admin" element={<AdminProductPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
