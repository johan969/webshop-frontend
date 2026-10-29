import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WelcomePage from "./pages/WelcomePage";
import AdminProductPage from "./pages/adminProductPage";
import ProtectedRoute, {
  ProtectedAdminRoute,
} from "./components/ProtectedRoute";
import CreateProductPage from "./pages/CreateProductPage";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import type { CartItem, Product } from "./types/product-cart";
import { createOrder } from "./service/orderService";
import HomePage from "./pages/HomePage";

import { getSession } from "./service/authService";
import type { User } from "./types/authType";

function App() {
  //hämtar användardata från backend, returnerar null om ej inloggad,
  const [user, setUser] = useState<User | null>(null);

  // sätter checkingSession till true för att indikera att vi kollar om användaren är inloggad
  const [checkingSession, setCheckingSession] = useState(true);

  //körs när App startar, sätter användaren till user eller till null vill fel, sedan sätts checkingSession till false så att appen kan renderas
  useEffect(() => {
    async function restoreSession() {
      try {
        const sessionUser = await getSession();
        setUser(sessionUser);
      } catch {
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    }

    restoreSession();
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //för att hålla reda på vilken text som visas i notis vid tillagd vara
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!cartNotification) {
      return;
    }
    const timer = setTimeout(() => {
      setCartNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [cartNotification]);

  function addToCart(product: Product) {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (product.stock <= 0) {
      return;
    }

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return;
      }
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      const cartItem: CartItem = {
        ...product, //kopierar all produktinfo
        quantity: 1,
      };
      //tar alla produkter som finns i kundvagn och lägger till den nya sist
      setCartItems((currentItems) => [...currentItems, cartItem]);
    }
    setCartNotification(`${product.name} har lagts till i kundvagnen`);
  }

  function increaseQuantity(productId: number) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseQuantity(productId: number) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Kundvagnen är tom.");
      return;
    }

    // Skapa ny order
    const orderRequest = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    // Skickar beställningen till backend
    try {
      await createOrder(orderRequest);

      // Tömmer kundvagnen om beställningen lyckas
      setCartItems([]);
      sessionStorage.removeItem("cart");

      alert("Ordern har skapats.");
    } catch {
      alert("Något gick fel när ordern skulle skapas.");
    }
  };

  const { pathname } = useLocation();

  if (checkingSession) {
    return <p>Kontrollerar inloggning...</p>;
  }

  return (
    //behållare för appens sidor med route path till login
    <>
      {/*om path bara är "/" (dvs startsidan) visas inte headern */}
      {pathname !== "/" && (
        <Header
          user={user}
          setUser={setUser}
          cartItems={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onCheckout={handleCheckout}
        />
      )}
      {cartNotification && (
        <div className="cart-notification" role="status">
          {cartNotification}
        </div>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />

        {/*Skickar användaren från App.sx till ProtectedRoute.tsx*/}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/welcome" element={<WelcomePage />} />

          <Route
            path="/products"
            element={<ProductPage onAddToCart={addToCart} />}
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetailPage
                cartItems={cartItems}
                onAddToCart={addToCart}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
                onCheckout={handleCheckout}
              />
            }
          />

          {/* Skickar user till ProtectedAdminRoute för att kontrollera adminrollen */}
          <Route element={<ProtectedAdminRoute user={user} />}>
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
