import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1"
      : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary";
  };

  return (
    <header className="sticky top-0 z-50 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none w-full">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto h-16">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          Velora
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-lg h-full">
          <Link to="/" className={`text-label-md font-label-md transition-colors active:scale-95 duration-150 ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/products" className={`text-label-md font-label-md transition-colors active:scale-95 duration-150 ${isActive('/products')}`}>
            Shop
          </Link>
          <Link to="/products?filter=Electronics" className="text-on-surface-variant dark:text-surface-variant text-label-md font-label-md hover:text-primary dark:hover:text-inverse-primary transition-colors active:scale-95 duration-150">
            Categories
          </Link>
          <Link to="/products?filter=Sale" className="text-on-surface-variant dark:text-surface-variant text-label-md font-label-md hover:text-primary dark:hover:text-inverse-primary transition-colors active:scale-95 duration-150">
            Deals
          </Link>
        </nav>

        {/* Trailing Actions & Mobile Menu */}
        <div className="flex items-center gap-md text-primary dark:text-inverse-primary">
          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="hover:bg-surface-container rounded-full p-2 transition-colors active:scale-95 duration-150 relative block"
            aria-label="View Cart"
          >
            <span className="material-symbols-outlined block">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-on-error rounded-full w-5 h-5 text-[10px] flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Icon */}
          <Link 
            to={user ? "/profile" : "/login"} 
            className="hover:bg-surface-container rounded-full p-2 transition-colors active:scale-95 duration-150 hidden md:block"
            aria-label="View Profile"
          >
            <span className="material-symbols-outlined block">account_circle</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden hover:bg-surface-container rounded-full p-2 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined block">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface dark:bg-inverse-surface border-b border-outline-variant p-lg flex flex-col gap-md">
          <Link 
            to="/" 
            className="text-body-lg font-bold text-on-background py-2 border-b border-outline-variant/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-body-lg font-bold text-on-background py-2 border-b border-outline-variant/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/products?filter=Electronics" 
            className="text-body-lg text-on-surface-variant py-2 border-b border-outline-variant/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            Electronics
          </Link>
          <Link 
            to="/products?filter=Audio" 
            className="text-body-lg text-on-surface-variant py-2 border-b border-outline-variant/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            Audio
          </Link>
          <Link 
            to="/products?filter=Sale" 
            className="text-body-lg text-on-surface-variant py-2 border-b border-outline-variant/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            Deals
          </Link>
          <Link 
            to={user ? "/profile" : "/login"} 
            className="flex items-center gap-2 text-body-lg font-bold text-primary py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined">account_circle</span>
            {user ? 'My Profile' : 'Sign In'}
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
