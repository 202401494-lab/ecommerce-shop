import React, { useState } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const Navbar = ({ onNavClick }) => {
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => onNavClick('catalog')}
          >
            🛍️ E-Store
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavClick('catalog')}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Catálogo
            </button>

            <button
              onClick={() => onNavClick('cart')}
              className="relative text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              Carrito
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FiUser size={20} />
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    {isAdmin && <p className="text-xs text-green-600">Admin</p>}
                  </div>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => onNavClick('admin')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Panel Admin
                  </button>
                )}
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Login con Google
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <button
              onClick={() => {
                onNavClick('catalog');
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-600 hover:text-blue-600"
            >
              Catálogo
            </button>
            <button
              onClick={() => {
                onNavClick('cart');
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <FiShoppingCart size={20} />
              Carrito ({cartCount})
            </button>
            {user ? (
              <>
                <div className="border-t pt-4">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  {isAdmin && <p className="text-xs text-green-600 mt-1">Admin</p>}
                </div>
                {isAdmin && (
                  <button
                    onClick={() => {
                      onNavClick('admin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Panel Admin
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  loginWithGoogle();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
