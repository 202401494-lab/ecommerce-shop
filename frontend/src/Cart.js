import React from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import api from './api';
import toast from 'react-hot-toast';

const Cart = ({ onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Por favor inicia sesión primero');
      return;
    }

    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    try {
      await api.post('/api/orders', {
        items: cart,
        total: getTotal()
      });

      toast.success('Pedido enviado correctamente!');
      clearCart();
      // Redirect to catalog
      onCheckout && onCheckout();
    } catch (error) {
      toast.error('Error al procesar el pedido');
      console.error(error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Tu carrito está vacío</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="space-y-4 mb-8">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex gap-4 bg-white rounded-lg shadow p-4"
          >
            {item.imagen && (
              <img
                src={item.imagen}
                alt={item.nombre}
                className="w-20 h-20 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.nombre}</h3>
              <p className="text-gray-600">${item.precio.toFixed(2)} c/u</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 p-2 rounded hover:bg-gray-300"
              >
                <FiMinus />
              </button>
              <span className="w-8 text-center font-bold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 p-2 rounded hover:bg-gray-300"
              >
                <FiPlus />
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg">
                ${(item.precio * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-700 mt-2"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6 text-xl font-bold">
          <span>Total:</span>
          <span className="text-2xl text-blue-600">${getTotal().toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition mb-2"
        >
          Procesar Pedido
        </button>

        <button
          onClick={() => clearCart()}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;
