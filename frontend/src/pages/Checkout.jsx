import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Checkout = () => {
  const { cartItems, cartCount, cartSubtotal, shippingFee, taxEstimate, cartTotal, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("Select");
  const [zip, setZip] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cc"); // cc or paypal
  
  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Populate logged in user details
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      if (user.name) {
        const parts = user.name.split(' ');
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(' ') || "");
      }
      if (user.address) {
        setAddress(user.address.street || "");
        setCity(user.address.city || "");
        setStateVal(user.address.state || "Select");
        setZip(user.address.zip || "");
      }
    }
  }, [user]);

  if (cartItems.length === 0 && !success) {
    return (
      <main className="flex-grow max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-3xl text-center">
        <span className="material-symbols-outlined text-[64px] text-error mb-md">warning</span>
        <h2 className="text-headline-lg font-bold text-on-surface">No Items to Checkout</h2>
        <p className="text-body-lg text-on-surface-variant mt-sm">Your cart is currently empty. Please add items before checking out.</p>
        <Link to="/products" className="mt-xl inline-block bg-primary hover:bg-primary-container text-on-primary font-label-md px-xl py-3 rounded-xl">
          Back to Shop
        </Link>
      </main>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !address || !city || !zip) {
      alert("Please fill in all required shipping fields");
      return;
    }

    if (paymentMethod === 'cc' && (!cardNumber || !cardExpiry || !cardCvc || !cardName)) {
      alert("Please fill in all credit card payment details");
      return;
    }

    // Process mock order
    const generatedOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedOrderId);
    setSuccess(true);

    // If logged in, add order to history
    if (user) {
      const newOrder = {
        id: generatedOrderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: cartTotal,
        status: "In Transit"
      };
      const updatedUser = {
        ...user,
        orders: [newOrder, ...(user.orders || [])]
      };
      updateProfile(updatedUser);
    }

    // Clear shopping cart
    clearCart();
  };

  if (success) {
    return (
      <main className="flex-grow max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-3xl text-center flex flex-col items-center justify-center gap-md">
        <div className="w-20 h-20 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-md">
          <span className="material-symbols-outlined text-[48px]">check_circle</span>
        </div>
        <h1 className="text-display-lg font-bold text-on-background">Thank You For Your Order!</h1>
        <p className="text-body-lg text-on-surface-variant max-w-lg mt-sm">
          Your order <span className="font-semibold text-primary">{orderId}</span> has been placed successfully. We have sent a confirmation email to <span className="font-semibold">{email}</span>.
        </p>
        <div className="flex gap-md mt-xl">
          <Link to="/products" className="bg-primary hover:bg-primary-container text-on-primary font-label-md px-xl py-3 rounded-xl transition-all">
            Continue Shopping
          </Link>
          {user && (
            <Link to="/profile" className="bg-surface hover:bg-surface-container text-primary border border-primary font-label-md px-xl py-3 rounded-xl transition-all">
              Go to Profile
            </Link>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl text-left">
      <div className="mb-xl flex items-center gap-xs">
        <Link to="/cart" className="text-primary hover:text-primary-container transition-colors font-label-md text-label-md flex items-center">
          <span className="material-symbols-outlined text-[18px] mr-1 block">arrow_back</span>
          Back to Cart
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-3xl">
        {/* Shipping Form & Payment details */}
        <form onSubmit={handlePlaceOrder} className="w-full lg:w-2/3 flex flex-col gap-2xl">
          {/* Step 1: Shipping */}
          <section className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex items-center gap-md mb-lg">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-bold">1</div>
              <h2 className="text-headline-md font-headline-md text-on-surface">Shipping Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="md:col-span-2 text-left">
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                />
              </div>
              <div className="text-left">
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">First Name *</label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name" 
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                />
              </div>
              <div className="text-left">
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Last Name *</label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name" 
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                />
              </div>
              <div className="md:col-span-2 text-left">
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Address *</label>
                <input 
                  type="text" 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address or P.O. Box" 
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                />
              </div>
              <div className="md:col-span-2 text-left">
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Apartment, suite, etc. (optional)</label>
                <input 
                  type="text" 
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="Apt, Suite, Unit" 
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                />
              </div>
              <div className="text-left">
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">City *</label>
                <input 
                  type="text" 
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City" 
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-md text-left">
                <div>
                  <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">State *</label>
                  <select 
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md cursor-pointer"
                  >
                    <option>Select</option>
                    <option>CA</option>
                    <option>NY</option>
                    <option>TX</option>
                    <option>WA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">ZIP Code *</label>
                  <input 
                    type="text" 
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="ZIP" 
                    className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Payment */}
          <section className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-md mb-lg text-on-surface-variant">
              <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-label-md text-label-md font-bold">2</div>
              <h2 className="text-headline-md font-headline-md text-on-surface">Payment Method</h2>
            </div>
            
            <div className="flex flex-col gap-md">
              {/* Credit Card Option */}
              <div className={`border rounded-xl p-md bg-surface-container-low transition-all ${paymentMethod === 'cc' ? 'border-primary' : 'border-outline-variant'}`}>
                <div className="flex items-center justify-between mb-md">
                  <div className="flex items-center gap-xs">
                    <input 
                      type="radio" 
                      id="cc" 
                      name="payment" 
                      checked={paymentMethod === 'cc'}
                      onChange={() => setPaymentMethod('cc')}
                      className="w-4 h-4 text-primary focus:ring-primary border-outline cursor-pointer"
                    />
                    <label htmlFor="cc" className="font-label-md text-label-md text-on-surface cursor-pointer select-none">Credit Card</label>
                  </div>
                  <div className="text-on-surface-variant">
                    <span className="material-symbols-outlined block">credit_card</span>
                  </div>
                </div>
                
                {/* CC Form */}
                {paymentMethod === 'cc' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
                    <div className="md:col-span-2 text-left">
                      <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Card Number *</label>
                      <input 
                        type="text" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="0000 0000 0000 0000" 
                        className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Expiration Date *</label>
                      <input 
                        type="text" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY" 
                        className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">CVC *</label>
                      <input 
                        type="text" 
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123" 
                        className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                      />
                    </div>
                    <div className="md:col-span-2 text-left">
                      <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Name on Card *</label>
                      <input 
                        type="text" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Full Name" 
                        className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* PayPal Option */}
              <div className={`border rounded-xl p-md transition-all cursor-pointer ${paymentMethod === 'paypal' ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:bg-surface-container-low/50'}`}>
                <div className="flex items-center gap-xs">
                  <input 
                    type="radio" 
                    id="paypal" 
                    name="payment" 
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="w-4 h-4 text-primary focus:ring-primary border-outline cursor-pointer"
                  />
                  <label htmlFor="paypal" className="font-label-md text-label-md text-on-surface cursor-pointer flex items-center justify-between w-full select-none">
                    <span>PayPal</span>
                    <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        </form>

        {/* Sidebar Order Review */}
        <div className="w-full lg:w-1/3">
          <div className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/30 sticky top-24">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-lg">Order Summary</h2>
            
            {/* Items List */}
            <div className="flex flex-col gap-md mb-lg border-b border-outline-variant/50 pb-lg">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="flex items-start gap-md text-left">
                  <div className="w-16 h-16 bg-surface-variant rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-xs border border-outline-variant/30">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-body-md text-body-md text-on-surface line-clamp-1">{item.product.name}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Qty: {item.quantity} • {item.selectedColor}</p>
                  </div>
                  <div className="font-price-lg text-price-lg text-on-surface">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-sm mb-xl text-body-md font-body-md text-left">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Taxes (8%)</span>
                <span>${taxEstimate.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-outline-variant/50 pt-md mt-sm flex justify-between items-center text-on-surface">
                <span className="font-headline-md text-headline-md">Total</span>
                <span className="font-price-lg text-price-lg text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-sm px-lg rounded-lg transition-colors flex items-center justify-center gap-xs active:scale-95 duration-100 shadow-sm"
            >
              <span className="material-symbols-outlined block">lock</span>
              Place Order
            </button>
            
            <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-sm flex items-center justify-center gap-xs opacity-70">
              Secure checkout provided by Stripe
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Checkout;
