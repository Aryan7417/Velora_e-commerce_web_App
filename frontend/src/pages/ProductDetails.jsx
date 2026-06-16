import axios from "axios";

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  //const product = getProductById(id);
  
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);

  useEffect(() => {
  const localProduct = getProductById(id);

  if (localProduct) {
    setProduct(localProduct);
  } else {
    axios
      .get(`http://localhost:2000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }
}, [id]);

  if (!product) {
    return (
      <div className="flex-grow max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-3xl text-center">
        <span className="material-symbols-outlined text-[64px] text-error mb-md">warning</span>
        <h2 className="text-headline-lg font-bold text-on-surface">Product Not Found</h2>
        <p className="text-body-lg text-on-surface-variant mt-sm">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="mt-xl inline-block bg-primary hover:bg-primary-container text-on-primary font-label-md px-xl py-3 rounded-xl">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  // Setup gallery thumbnails
  const allThumbnails = [product.image, ...(product.thumbnails || [])];

  const handleAddToCart = () => {
    addToCart(product, 1, selectedColor);
    setFeedbackMsg("Added to cart successfully!");
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl md:py-3xl text-left">
      {/* Breadcrumbs / Back button */}
      <div className="mb-lg">
        <Link to="/products" className="text-primary hover:text-primary-container transition-colors font-label-md text-label-md flex items-center gap-xs">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl md:gap-3xl items-start">
        {/* Product Image Section */}
        <div className="flex flex-col gap-md sticky top-24">
          <div className="bg-surface-container-low rounded-xl overflow-hidden aspect-square flex items-center justify-center p-xl relative shadow-sm transition-shadow hover:shadow-md border border-outline-variant/30">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-lg transform transition-transform duration-500 hover:scale-105" 
            />
          </div>
          
          {/* Thumbnails */}
          {allThumbnails.length > 1 && (
            <div className="grid grid-cols-4 gap-sm">
              {allThumbnails.map((thumb, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(thumb)}
                  className={`bg-surface-container-low rounded-lg aspect-square p-sm border-2 overflow-hidden transition-all ${
                    activeImage === thumb ? 'border-primary' : 'border-transparent hover:border-outline-variant'
                  }`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
              <button 
                onClick={() => alert("Simulated video review playing...")}
                className="bg-surface-container-low rounded-lg aspect-square p-sm border-2 border-transparent hover:border-outline-variant overflow-hidden flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                aria-label="Play video"
              >
                <span className="material-symbols-outlined text-[32px] block">play_circle</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col gap-lg">
          {/* Header */}
          <div className="flex flex-col gap-xs">
            {product.isNew && (
              <div className="flex items-center gap-xs">
                <span className="bg-surface-container-high text-on-surface-variant text-label-md font-label-md px-sm py-base rounded-md">
                  New Arrival
                </span>
              </div>
            )}
            <h1 className="text-display-lg font-display-lg text-on-background mt-2">
              {product.name}
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-sm">
            {product.oldPrice ? (
              <>
                <span className="text-display-lg font-display-lg text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-body-md font-body-md text-outline line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-display-lg font-display-lg text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="h-px w-full bg-outline-variant my-md"></div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-md">
              <span className="text-label-md font-label-md text-on-background">
                Select Color: <span className="font-normal text-on-surface-variant">Color ({selectedColor})</span>
              </span>
              <div className="flex items-center gap-md">
                {product.colors.map((color) => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-10 h-10 rounded-full border border-black/10 ring-2 ring-offset-2 transition-all ${
                      selectedColor === color 
                        ? 'ring-primary ring-offset-background' 
                        : 'ring-transparent hover:ring-outline-variant ring-offset-background'
                    }`}
                    aria-label={`Select Color: ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Feedback messages */}
          {feedbackMsg && (
            <div className="bg-green-100 text-green-800 p-sm rounded-lg text-body-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              {feedbackMsg}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-sm mt-lg">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-container text-on-primary text-label-md font-label-md py-md rounded-xl transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-sm active:scale-95 duration-100"
            >
              <span className="material-symbols-outlined text-[20px] block">shopping_bag</span>
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className="flex-1 bg-surface hover:bg-surface-container-low text-primary border border-primary text-label-md font-label-md py-md rounded-xl transition-colors flex items-center justify-center gap-sm active:scale-95 duration-100"
            >
              <span 
                className="material-symbols-outlined text-[20px] block"
                style={{ fontVariationSettings: `'FILL' ${isFavorited ? 1 : 0}, 'wght' 400` }}
              >
                favorite
              </span>
              {isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          <div className="h-px w-full bg-outline-variant my-md"></div>

          {/* Specifications Bento Grid */}
          <div className="flex flex-col gap-md">
            <h2 className="text-headline-md font-headline-md text-on-background mb-sm">Key Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
              {Object.entries(product.specs || {}).map(([key, value]) => {
                let specIcon = "info";
                if (key.toLowerCase().includes("battery")) specIcon = "battery_charging_full";
                else if (key.toLowerCase().includes("material")) specIcon = "diamond";
                else if (key.toLowerCase().includes("connectivity")) specIcon = "wifi_tethering";
                else if (key.toLowerCase().includes("layout")) specIcon = "keyboard";
                else if (key.toLowerCase().includes("switch")) specIcon = "settings";

                return (
                  <div 
                    key={key} 
                    className="bg-surface-container-low p-md rounded-xl flex flex-col gap-xs shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 text-left"
                  >
                    <span className="material-symbols-outlined text-primary text-[28px] block">{specIcon}</span>
                    <span className="text-label-md font-label-md text-on-background mt-xs">{key}</span>
                    <span className="text-body-sm font-body-sm text-on-surface-variant">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProductDetails;
