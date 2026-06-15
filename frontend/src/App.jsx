import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import Login from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { Profile } from './pages/Profile.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

function App() {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {/* Header layout choice */}
          {!isAuthPage && (
            isCheckout ? (
              <header className="bg-surface border-b border-outline-variant w-full h-16 flex items-center justify-center shadow-sm sticky top-0 z-50">
                <div className="text-headline-md font-headline-md font-bold text-primary">Velora</div>
              </header>
            ) : (
              <Header />
            )
          )}

          {/* Page Routing Switch */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          {/* Footer layout choice */}
          {!isAuthPage && (
            isCheckout ? (
              <footer className="bg-surface-container-lowest border-t border-outline-variant mt-auto py-xl px-margin-desktop w-full text-center">
                <p className="font-body-sm text-body-sm text-on-surface-variant">© {new Date().getFullYear()} Velora. Secure Checkout.</p>
              </footer>
            ) : (
              <Footer />
            )
          )}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
