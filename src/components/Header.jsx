import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store";

const Header = () => {
  const location = useLocation();
  const snap = useSnapshot(state);
  
  // Don't show header on home/intro page
  if (location.pathname === "/" && snap.intro) return null;
  
  return (
    <header className="bg-white shadow-md py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">DRIP Store</Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/cart" className="relative">
            <span className="hover:text-blue-600">Cart</span>
            {snap.cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {snap.cart.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
