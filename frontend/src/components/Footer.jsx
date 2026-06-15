import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant dark:border-outline w-full mt-auto">
      <div className="w-full py-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-lg">
        <Link to="/" className="text-headline-sm font-headline-sm font-bold text-on-surface dark:text-inverse-on-surface">
          Velora
        </Link>
        <nav className="flex flex-wrap justify-center gap-md md:gap-lg">
          <a href="#" className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors text-label-md font-label-md">
            Privacy Policy
          </a>
          <a href="#" className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors text-label-md font-label-md">
            Terms of Service
          </a>
          <a href="#" className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors text-label-md font-label-md">
            Contact Us
          </a>
          <a href="#" className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors text-label-md font-label-md">
            About
          </a>
        </nav>
        <div className="text-body-sm font-body-sm text-on-surface-variant dark:text-surface-variant">
          © {new Date().getFullYear()} Velora. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
