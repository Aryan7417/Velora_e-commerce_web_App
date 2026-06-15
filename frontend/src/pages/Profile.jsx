import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview'); // overview, orders, wishlist, settings

  // Edit details form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zip, setZip] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setName(user.name || "");
      setPhone(user.phone || "");
      setStreet(user.address?.street || "");
      setCity(user.address?.city || "");
      setStateVal(user.address?.state || "");
      setZip(user.address?.zip || "");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Redirecting...
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name,
      phone,
      address: {
        street,
        city,
        state: stateVal,
        zip,
        country: "United States"
      }
    };
    updateProfile(updatedUser);
    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 3000);
  };

  const tabClass = (tabId) => {
    return activeTab === tabId
      ? "flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-xl px-4 py-3 font-label-md text-label-md translate-x-1 duration-200 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)]"
      : "flex items-center gap-3 text-on-surface-variant px-4 py-3 font-label-md text-label-md hover:bg-surface-container-high rounded-xl transition-all";
  };

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-2xl grid grid-cols-1 md:grid-cols-12 gap-lg md:gap-xl items-start text-left">
      {/* Left Sidebar Navigation */}
      <aside className="col-span-1 md:col-span-3 bg-surface-container-low rounded-xl shadow-sm p-md flex flex-col gap-sm border border-outline-variant/30">
        <h2 className="text-label-md font-label-md text-on-surface-variant uppercase mb-xs px-2 tracking-wider">Account</h2>
        <nav className="flex flex-col gap-1">
          <button onClick={() => setActiveTab('overview')} className={tabClass('overview')}>
            <span className="material-symbols-outlined block">person</span>
            Profile Overview
          </button>
          <button onClick={() => setActiveTab('orders')} className={tabClass('orders')}>
            <span className="material-symbols-outlined block">receipt_long</span>
            Orders ({user.orders?.length || 0})
          </button>
          <button onClick={() => setActiveTab('wishlist')} className={tabClass('wishlist')}>
            <span className="material-symbols-outlined block">favorite</span>
            Wishlist ({wishlistItems.length})
          </button>
          <button onClick={() => setActiveTab('settings')} className={tabClass('settings')}>
            <span className="material-symbols-outlined block">settings</span>
            Settings
          </button>
          <button onClick={handleSignOut} className="flex items-center gap-3 text-on-surface-variant px-4 py-3 font-label-md text-label-md hover:bg-surface-container-high rounded-xl transition-all mt-md border-t border-outline-variant pt-md text-left w-full">
            <span className="material-symbols-outlined block">logout</span>
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="col-span-1 md:col-span-9 flex flex-col gap-2xl">
        
        {/* Profile Header Card */}
        <section className="relative overflow-hidden rounded-xl bg-surface p-xl shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col md:flex-row items-center md:items-start gap-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed rounded-full blur-3xl opacity-20 -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] shrink-0 bg-surface-container-highest">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5mDk38gPWAtNnLd26p2r8oTlx15Ti92dz-PzpYLyKoQh6vNMayimRQI0KoyTcJv4YqgxayUT1Wu9BlgyQvKYcRHE3XErj91gVpLLc0sl5ybNy132YXZfkrCV7aXnFtyVQCXAuuX50MFKeQfppnSZ8CN5YEA6F2RtwoUpZQkzoS-_Mi1gLScLAOwaRfGp3P5Y8rXtM7x0wJS2A2-y5H_Vg6A-sClFZ4ijuMm4ikyzSMK-f8nyKDhgAK0A8tTNT7dKWkzEHcBXt8jI" 
              alt="Profile Picture" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left z-10">
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface mb-xs">
              {user.name}
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mb-md">{user.email}</p>
            <div className="flex flex-wrap gap-sm justify-center md:justify-start">
              <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface px-3 py-1 rounded-DEFAULT text-label-md font-label-md">
                <span className="material-symbols-outlined text-[16px] block">verified</span>
                Verified Member
              </span>
              <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface px-3 py-1 rounded-DEFAULT text-label-md font-label-md">
                <span className="material-symbols-outlined text-[16px] block">loyalty</span>
                {user.tier || "Member"}
              </span>
            </div>
          </div>
          
          <div className="z-10 mt-md md:mt-0">
            <button 
              onClick={() => setActiveTab('settings')}
              className="bg-primary text-on-primary font-label-md text-label-md px-lg py-2 rounded-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] hover:bg-primary-container transition-colors whitespace-nowrap active:scale-95 duration-100"
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* Tab Content rendering */}
        {activeTab === 'overview' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Recent Orders Block */}
            <div className="bg-surface rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-lg flex flex-col">
              <div className="flex justify-between items-center border-b border-outline-variant pb-md mb-md">
                <h3 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary block">local_shipping</span>
                  Recent Orders
                </h3>
                <button onClick={() => setActiveTab('orders')} className="text-primary hover:text-primary-container text-label-md font-label-md transition-colors">
                  View All
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {user.orders && user.orders.length > 0 ? (
                  user.orders.slice(0, 2).map((order) => (
                    <React.Fragment key={order.id}>
                      <div className="flex justify-between items-start group hover:bg-surface-container-low p-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                        <div>
                          <p className="text-body-md font-body-md font-bold text-on-surface">Order #{order.id}</p>
                          <p className="text-body-sm font-body-sm text-on-surface-variant">Placed on {order.date}</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <span className="text-price-lg font-price-lg text-on-surface">${order.amount.toFixed(2)}</span>
                          <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-DEFAULT text-[12px] font-bold uppercase tracking-wider">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-outline-variant/50 last:hidden"></div>
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-body-sm text-on-surface-variant text-center py-sm">No orders placed yet.</p>
                )}
              </div>
            </div>

            {/* Account Information Block */}
            <div className="bg-surface rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-lg flex flex-col">
              <h3 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-md mb-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary block">contact_mail</span>
                Account Info
              </h3>
              <dl className="flex flex-col gap-md">
                <div className="grid grid-cols-3 gap-2">
                  <dt className="col-span-1 text-label-md font-label-md text-on-surface-variant">Full Name</dt>
                  <dd className="col-span-2 text-body-md font-body-md text-on-surface">{user.name}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="col-span-1 text-label-md font-label-md text-on-surface-variant">Email</dt>
                  <dd className="col-span-2 text-body-md font-body-md text-on-surface">{user.email}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="col-span-1 text-label-md font-label-md text-on-surface-variant">Phone</dt>
                  <dd className="col-span-2 text-body-md font-body-md text-on-surface">{user.phone || "Not provided"}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="col-span-1 text-label-md font-label-md text-on-surface-variant">Address</dt>
                  <dd className="col-span-2 text-body-md font-body-md text-on-surface text-on-surface-variant leading-tight">
                    {user.address?.street ? (
                      <>
                        {user.address.street}<br/>
                        {user.address.city}, {user.address.state} {user.address.zip}<br/>
                        {user.address.country}
                      </>
                    ) : (
                      "No address set"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        )}

        {activeTab === 'orders' && (
          <div className="bg-surface rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-lg">
            <h3 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-md mb-md">
              Order History
            </h3>
            {user.orders && user.orders.length > 0 ? (
              <div className="flex flex-col gap-sm">
                {user.orders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center bg-surface-container-low rounded-xl p-md border border-outline-variant/20 hover:border-outline transition-colors">
                    <div>
                      <p className="text-body-md font-bold text-on-surface">Order #{order.id}</p>
                      <p className="text-body-sm text-on-surface-variant">Date: {order.date}</p>
                    </div>
                    <div className="flex items-center gap-lg">
                      <div className="text-right">
                        <p className="text-price-lg font-bold text-primary">${order.amount.toFixed(2)}</p>
                        <span className="inline-block bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[12px] font-bold uppercase tracking-wider">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-xl">
                <p className="text-body-md text-on-surface-variant">No orders placed yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="bg-surface rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-lg">
            <h3 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-md mb-md">
              Your Wishlist ({wishlistItems.length})
            </h3>
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
                {wishlistItems.map((product) => (
                  <div key={product.id} className="bg-surface border border-outline-variant/30 rounded-xl overflow-hidden group flex flex-col">
                    <div className="bg-surface-bright aspect-square relative overflow-hidden flex items-center justify-center p-sm">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      <button 
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-3 right-3 bg-surface/85 backdrop-blur-sm p-2 rounded-full shadow-sm text-primary hover:bg-surface transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <span className="material-symbols-outlined text-[20px] block" style={{ fontVariationSettings: "'FILL' 1" }}>
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="p-md flex flex-col flex-grow justify-between text-left">
                      <div>
                        <h4 className="text-body-md font-bold text-on-surface mb-1 line-clamp-1">{product.name}</h4>
                        <p className="text-body-sm text-on-surface-variant line-clamp-1 mb-2">{product.description}</p>
                      </div>
                      <div className="flex justify-between items-end mt-auto pt-sm border-t border-outline-variant/50">
                        <span className="text-price-lg font-price-lg text-on-surface">${product.price.toFixed(2)}</span>
                        <button 
                          onClick={() => addToCart(product, 1)}
                          className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1 active:scale-95 duration-100"
                        >
                          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-xl">
                <p className="text-body-md text-on-surface-variant">Your wishlist is empty.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-surface rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-lg">
            <h3 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-md mb-md">
              Account Settings
            </h3>
            
            {editSuccess && (
              <div className="mb-md bg-green-100 text-green-800 p-sm rounded-lg text-body-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="md:col-span-2">
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
                />
              </div>
              <div>
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Phone Number</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">Street Address</label>
                <input 
                  type="text" 
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
                />
              </div>
              <div>
                <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">City</label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">State</label>
                  <input 
                    type="text" 
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-semibold text-on-surface-variant mb-xs">ZIP Code</label>
                  <input 
                    type="text" 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full border border-outline-variant rounded px-md py-sm bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
                  />
                </div>
              </div>
              <div className="md:col-span-2 mt-sm">
                <button 
                  type="submit"
                  className="bg-primary text-on-primary font-label-md text-label-md px-lg py-2 rounded-xl shadow-sm hover:bg-primary-container active:scale-95 duration-100"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </main>
  );
};
export default Profile;
