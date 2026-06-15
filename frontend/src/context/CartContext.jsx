import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0); // in percentage

  // Load cart on init
  useEffect(() => {
    const storedCart = localStorage.getItem('velora_cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart on changes
  const saveCart = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem('velora_cart', JSON.stringify(newItems));
  };

  const addToCart = (product, quantity = 1, color = null) => {
    const selectedColor = color || (product.colors && product.colors[0]) || 'Default';
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.selectedColor === selectedColor
    );

    let updatedCart = [...cartItems];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        product,
        quantity,
        selectedColor
      });
    }
    saveCart(updatedCart);
  };

  const removeFromCart = (productId, color) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.product.id === productId && item.selectedColor === color)
    );
    saveCart(updatedCart);
  };

  const updateQuantity = (productId, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }

    const updatedCart = cartItems.map((item) => {
      if (item.product.id === productId && item.selectedColor === color) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
    setPromoCode("");
    setPromoDiscount(0);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VELORA10' || cleanCode === 'SAVE10') {
      setPromoCode(cleanCode);
      setPromoDiscount(10); // 10% off
      return { success: true, message: "10% discount applied!" };
    } else if (cleanCode === 'WELCOME20') {
      setPromoCode(cleanCode);
      setPromoDiscount(20); // 20% off
      return { success: true, message: "20% discount applied!" };
    }
    return { success: false, message: "Invalid promo code" };
  };

  // Calculations
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const rawSubtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const discountAmount = rawSubtotal * (promoDiscount / 100);
  const cartSubtotal = rawSubtotal - discountAmount;

  // Shipping is free if subtotal is over $50, otherwise $15. If cart is empty, shipping is 0.
  const shippingFee = cartItems.length === 0 ? 0 : (cartSubtotal > 50 ? 0 : 15);
  const taxRate = 0.08; // 8%
  const taxEstimate = cartSubtotal * taxRate;
  const cartTotal = cartSubtotal + shippingFee + taxEstimate;

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      rawSubtotal,
      discountAmount,
      cartSubtotal,
      shippingFee,
      taxEstimate,
      cartTotal,
      promoCode,
      promoDiscount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyPromoCode
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
