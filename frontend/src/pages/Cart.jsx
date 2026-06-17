import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { 
    cartItems, 
    cartCount, 
    rawSubtotal,
    discountAmount,
    cartSubtotal, 
    shippingFee, 
    taxEstimate, 
    cartTotal, 
    updateQuantity, 
    removeFromCart, 
    applyPromoCode,
    promoCode,
    promoDiscount
  } = useCart();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState({ success: false, message: "" });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput("");
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex-grow max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-3xl text-center flex flex-col items-center justify-center gap-md">
        <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-40">shopping_cart</span>
        <h2 className="text-headline-lg font-bold text-on-surface">Your Cart is Empty</h2>
        <p className="text-body-lg text-on-surface-variant max-w-md">Looks like you haven't added anything to your cart yet. Head over to the catalog to discover our premium equipment.</p>
        <Link to="/products" className="mt-md bg-primary hover:bg-primary-container text-on-primary font-label-md px-xl py-3 rounded-xl transition-all active:scale-95 duration-100 shadow-sm">
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl grid grid-cols-1 lg:grid-cols-12 gap-xl text-left">
      {/* Cart Items Section */}
      <section className="lg:col-span-8 flex flex-col gap-lg">
        <h1 className="text-headline-lg font-headline-lg mb-md text-on-surface">Your Cart</h1>
        
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
          {cartItems.map((item, index) => {
            const { product, quantity, selectedColor } = item;
            return (
              <div 
                key={`${product.id}-${selectedColor}`} 
                className={`flex flex-col sm:flex-row items-start sm:items-center p-md sm:p-lg border-outline-variant gap-lg relative group ${
                  index !== cartItems.length - 1 ? 'border-b' : ''
                }`}
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 bg-surface rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-sm border border-outline-variant/30">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                
                {/* Item Details */}
                <div className="flex-grow flex flex-col gap-xs w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-body-lg font-body-lg font-semibold text-on-surface hover:text-primary">
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <p className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-2 mt-1">
                        Color: 
                        <span 
                          className="w-3 h-3 rounded-full border border-black/10 inline-block" 
                          style={{ backgroundColor: selectedColor }}
                        />
                        {selectedColor}
                      </p>
                    </div>
                    <span className="text-price-lg font-price-lg text-primary">
                      ₹{(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Quantity Controls & Remove */}
                  <div className="flex justify-between items-center mt-md w-full">
                    <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest">
                      <button 
                        onClick={() => updateQuantity(product.id, selectedColor, quantity - 1)}
                        className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <span className="material-symbols-outlined text-[18px] block">remove</span>
                      </button>
                      <span className="text-body-md font-body-md px-4 font-medium select-none">
                        {quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(product.id, selectedColor, quantity + 1)}
                        className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <span className="material-symbols-outlined text-[18px] block">add</span>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(product.id, selectedColor)}
                      className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 text-body-sm font-body-sm"
                    >
                      <span className="material-symbols-outlined text-[18px] block">delete</span>
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-sm">
          <Link to="/products" className="text-primary hover:underline text-body-sm font-body-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] block">arrow_back</span>
            Continue Shopping
          </Link>
        </div>
      </section>

      {/* Order Summary Section */}
      <section className="lg:col-span-4 mt-xl lg:mt-0">
        <div className="bg-surface-container-low rounded-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] p-lg border border-outline-variant/30 sticky top-24">
          <h2 className="text-headline-md font-headline-md mb-lg text-on-surface">Order Summary</h2>
          
          <div className="flex flex-col gap-sm border-b border-outline-variant pb-md mb-md">
            <div className="flex justify-between text-body-md font-body-md text-on-surface-variant">
              <span>Subtotal ({cartCount} items)</span>
              <span>₹{rawSubtotal.toFixed(2)}</span>
            </div>
            
            {promoCode && (
              <div className="flex justify-between text-body-md font-body-md text-green-700">
                <span>Discount ({promoDiscount}%)</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-body-md font-body-md text-on-surface-variant">
              <span>Shipping Estimate</span>
              <span>{shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-body-md font-body-md text-on-surface-variant">
              <span>Tax Estimate (8%)</span>
              <span>₹{taxEstimate.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-xl">
            <span className="text-body-lg font-body-lg font-bold text-on-surface">Estimated Total</span>
            <span className="text-headline-md font-headline-md font-bold text-primary">
              ₹{cartTotal.toFixed(2)}
            </span>
          </div>

          {/* Promo code entry */}
          <div className="mb-lg text-left">
            <label className="block text-label-md font-label-md mb-xs text-on-surface" htmlFor="promo-code">
              Promo Code
            </label>
            <form onSubmit={handleApplyPromo} className="flex gap-sm">
              <input 
                id="promo-code"
                type="text" 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Try: WELORA10" 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
              />
              <button 
                type="submit"
                className="bg-surface-container-lowest border border-primary text-primary hover:bg-surface transition-colors rounded-lg px-md py-sm text-label-md font-label-md font-semibold whitespace-nowrap active:scale-95"
              >
                Apply
              </button>
            </form>
            
            {/* Promo Code Feedback message */}
            {promoFeedback.message && (
              <p className={`text-body-sm mt-xs font-semibold ${promoFeedback.success ? 'text-green-700' : 'text-error'}`}>
                {promoFeedback.message}
              </p>
            )}
            
            {promoCode && (
              <p className="text-body-sm mt-xs text-green-700 font-semibold">
                Active Code: <span className="underline">{promoCode}</span>
              </p>
            )}
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-primary hover:bg-primary-container text-on-primary py-sm rounded-lg text-label-md font-label-md font-semibold transition-colors flex justify-center items-center gap-2 shadow-sm active:scale-95"
          >
            Proceed to Checkout
            <span className="material-symbols-outlined text-[18px] block">arrow_forward</span>
          </button>
          
          <div className="mt-md flex justify-center gap-4 text-on-surface-variant opacity-70">
            <span className="material-symbols-outlined block" title="Secure Checkout">lock</span>
            <span className="material-symbols-outlined block" title="Verified Seller">verified_user</span>
            <span className="material-symbols-outlined block" title="Fast Shipping">local_shipping</span>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Cart;
