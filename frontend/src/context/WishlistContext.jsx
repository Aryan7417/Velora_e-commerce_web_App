import React, { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('velora_wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  const saveWishlist = (newItems) => {
    setWishlistItems(newItems);
    localStorage.setItem('velora_wishlist', JSON.stringify(newItems));
  };

  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      saveWishlist([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    saveWishlist(wishlistItems.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return !!wishlistItems.find((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
export default WishlistContext;
