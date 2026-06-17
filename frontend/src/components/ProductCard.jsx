import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id || product._id);


  //console.log(product);

  // Determine badge
  let badgeText = null;
  if (product.isNew) badgeText = "New Arrival";
  else if (product.isSale) badgeText = "Sale";
  else if (product.isBestseller) badgeText = "Bestseller";

  return (
    <article className="bg-surface rounded-xl overflow-hidden ambient-shadow hover:shadow-lg transition-all duration-300 group flex flex-col h-full border border-outline-variant/30">
      {/* Product Image Container */}
      <div className="aspect-square bg-surface-container-low relative overflow-hidden flex items-center justify-center p-md">
        {badgeText && (
          <span className="absolute top-sm left-sm bg-surface-container-high text-on-surface-variant text-label-md font-label-md px-2 py-1 rounded-lg z-10">
            {badgeText}
          </span>
        )}
        
        {/* Wishlist Toggle Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-sm right-sm text-on-surface-variant hover:text-primary p-xs rounded-full bg-surface/50 backdrop-blur-sm z-10 md:opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <span 
            className="material-symbols-outlined block" 
            style={{ fontVariationSettings: `'FILL' ${isFavorited ? 1 : 0}, 'wght' 400` }}
          >
            favorite
          </span>
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${product.id || product._id}`} className="w-full h-full flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-md flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
          <h2 className="text-body-md font-body-md text-on-surface font-semibold mb-xs line-clamp-2 min-h-[48px]">
            {product.name}
          </h2>
        </Link>
        
        <div className="mt-auto pt-sm flex justify-between items-end">
          {/* Prices */}
          <div className="flex flex-col">
            {product.oldPrice ? (
              <>
                <span className="text-body-sm text-on-surface-variant line-through">
                  ₹{product.oldPrice.toFixed(2)}
                </span>
                <span className="text-price-lg font-price-lg text-error">
                  ₹{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-price-lg font-price-lg text-on-surface">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCart(product, 1)}
            className="bg-primary text-on-primary p-sm rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 duration-100"
            aria-label="Add to cart"
          >
            <span className="material-symbols-outlined block">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
export default ProductCard;
