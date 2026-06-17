import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export const Home = () => {
  // Grab specific products for the asymmetric grid
  const auraWatch = products.find(p => p.id === "5") || products[4];
  const sonicHeadphones = products.find(p => p.id === "6") || products[5];
  const ergoKeyboard = products.find(p => p.id === "7") || products[6];

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      
      <section className="relative w-full h-[600px] flex items-center justify-center bg-surface-container overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuD5hhj2S8jCxEmBIiy0a65E1oqUjzj0xUwr0nTYGKXKzjWAwxgB-RcIWh39_a--uRqfXADVP1aqedI05zRDv3rO5sjLO13FVDiADOUXOK1NDdF0ALG9nnF5IevZxDlyzYEmARobUElbL6Au2n0dRgSs_KfH7femt_k7whdzWY462lTMJZhAPvb3ODGacR1tsKY7rWIY0iGSdZ97vri2DV-mVhffiwsklcOczMi8_72ZJrzaF3vpfQ3S672ATV4DGTrjCCHPT__kc')" 
          }}
        ></div>
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center gap-lg">
          <span className="inline-block px-3 py-1 bg-surface-container-highest text-on-surface-variant text-label-md font-label-md rounded-DEFAULT tracking-wider uppercase">
            New Season Arrival
          </span>
          <h1 className="text-headline-lg-mobile md:text-display-lg font-headline-lg-mobile md:font-display-lg text-on-background">
            Elevate Your Everyday Tech
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Discover our latest collection of premium smartwatches, immersive audio, and precision keyboards designed for the modern professional.
          </p>
          <div className="flex gap-md mt-md">
            <Link to="/products" className="bg-primary hover:bg-primary-container text-on-primary text-label-md font-label-md px-xl py-3 rounded-xl transition-all shadow-[0px_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] active:scale-95 text-center">
              Shop Collection
            </Link>
            <Link to="/products?filter=Sale" className="bg-surface hover:bg-surface-container text-primary border border-primary text-label-md font-label-md px-xl py-3 rounded-xl transition-all shadow-[0px_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] active:scale-95 text-center">
              Explore Deals
            </Link>
          </div>
        </div>
      </section>
      --

      {/* Featured Products - Asymmetric Grid */}
      <section className="py-3xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-xl">
          <div>
            <h2 className="text-headline-md font-headline-md text-on-surface">Featured Equipment</h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-xs">Curated for performance and style.</p>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-xs text-primary text-label-md font-label-md hover:underline">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
          {/* Large Feature Card */}
          {auraWatch && (
            <Link 
              to={`/product/${auraWatch.id}`}
              className="md:col-span-8 group block relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-surface-container-low shadow-[0px_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] transition-all duration-300 border border-outline-variant/20"
            >
              <img 
                src={auraWatch.image} 
                alt={auraWatch.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-lg w-full text-left">
                <span className="inline-block px-2 py-1 bg-surface/90 text-on-surface text-xs font-bold rounded-DEFAULT mb-sm">
                  Bestseller
                </span>
                <h3 className="text-headline-md font-headline-md text-on-primary">
                  {auraWatch.name}
                </h3>
                <p className="text-body-md font-body-md text-on-primary/80 mt-1 mb-sm">
                  {auraWatch.description.split('.')[0]}.
                </p>
                <span className="text-price-lg font-price-lg text-on-primary">
                  ₹{auraWatch.price.toFixed(2)}
                </span>
              </div>
            </Link>
          )}

          {/* Smaller Stacked Cards */}
          <div className="md:col-span-4 flex flex-col gap-lg h-full">
            {/* Headphones */}
            {sonicHeadphones && (
              <Link 
                to={`/product/${sonicHeadphones.id}`}
                className="group flex-1 relative rounded-xl overflow-hidden bg-surface-container-low shadow-[0px_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col min-h-[200px] border border-outline-variant/20"
              >
                <div className="flex-grow relative h-32">
                  <img 
                    src={sonicHeadphones.image} 
                    alt={sonicHeadphones.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-md bg-surface z-10 relative text-left">
                  <h3 className="text-body-lg font-body-lg text-on-surface font-semibold">
                    {sonicHeadphones.name}
                  </h3>
                  <div className="flex justify-between items-center mt-xs">
                    <span className="text-body-sm text-on-surface-variant line-clamp-1">Active Noise Cancellation</span>
                    <span className="text-price-lg font-price-lg text-on-surface">₹{sonicHeadphones.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Keyboard */}
            {ergoKeyboard && (
              <Link 
                to={`/product/${ergoKeyboard.id}`}
                className="group flex-1 relative rounded-xl overflow-hidden bg-surface-container-low shadow-[0px_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col min-h-[200px] border border-outline-variant/20"
              >
                <div className=" relative h-32">
                  <img 
                    src={ergoKeyboard.image} 
                    alt={ergoKeyboard.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-md bg-surface z-10 relative text-left">
                  <h3 className="text-body-lg font-body-lg text-on-surface font-semibold">
                    {ergoKeyboard.name}
                  </h3>
                  <div className="flex justify-between items-center mt-xs">
                    <span className="text-body-sm text-on-surface-variant line-clamp-1">Tactile & Quiet</span>
                    <span className="text-price-lg font-price-lg text-on-surface">₹{ergoKeyboard.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-lg md:hidden text-center">
          <Link to="/products" className="inline-flex items-center gap-xs text-primary text-label-md font-label-md hover:underline">
            View All Products <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-surface-container-lowest border-y border-outline-variant py-2xl px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-xl">
            <h2 className="text-headline-md font-headline-md text-on-surface">Why Shop Velora</h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-xs">Committed to an effortless experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg divide-y md:divide-y-0 md:divide-x divide-outline-variant">
            {/* Fast Shipping */}
            <div className="flex flex-col items-center text-center p-md md:p-lg group">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px]">local_shipping</span>
              </div>
              <h3 className="text-body-lg font-body-lg text-on-surface font-semibold mb-xs">Fast Shipping</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Complimentary express delivery on all orders over ₹50. Arrives in 2-3 business days.</p>
            </div>
            {/* Secure Payment */}
            <div className="flex flex-col items-center text-center p-md md:p-lg group">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px]">lock</span>
              </div>
              <h3 className="text-body-lg font-body-lg text-on-surface font-semibold mb-xs">Secure Payment</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Your transactions are protected with industry-leading 256-bit encryption.</p>
            </div>
            {/* 24/7 Support */}
            <div className="flex flex-col items-center text-center p-md md:p-lg group">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px]">support_agent</span>
              </div>
              <h3 className="text-body-lg font-body-lg text-on-surface font-semibold mb-xs">24/7 Support</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Our dedicated product specialists are available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
