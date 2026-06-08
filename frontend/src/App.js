import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider } from './CartContext';
import Navbar from './Navbar';
import Catalog from './Catalog';
import Cart from './Cart';
import AdminPanel from './AdminPanel';
import './App.css';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('catalog');
  const { loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🛍️</div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'catalog':
        return <Catalog />;
      case 'cart':
        return <Cart onCheckout={() => setCurrentPage('catalog')} />;
      case 'admin':
        return isAdmin ? <AdminPanel /> : <Catalog />;
      default:
        return <Catalog />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavClick={setCurrentPage} />
      <main className="py-6">
        {renderPage()}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
