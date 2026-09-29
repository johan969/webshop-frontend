import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import Header from './components/Header'
import Footer from './components/Footer'
function App() {
  return (
   <>
    //behållare för appens sidor med route path till login
   <Header />
<Routes>
<Route path="/login" element={<LoginPage />} />
<Route path="/products" element={<ProductPage />} />
</Routes>
<Footer />
</>
  );
}
 
export default App;