import React, { useState, useEffect } from 'react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import api from './api';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Error cargando productos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error('Por favor inicia sesión primero');
      return;
    }
    addToCart(product, 1);
    toast.success(`${product.nombre} agregado al carrito`);
  };

  if (loading) {
    return <div className="text-center py-12">Cargando productos...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No hay productos disponibles</p>
          <p className="text-sm text-gray-400 mt-2">
            Por favor reemplaza el archivo Excel con tus productos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {product.imagen ? (
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Sin imagen</span>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{product.nombre}</h3>

                {product.categoria && (
                  <p className="text-sm text-gray-500 mb-2">{product.categoria}</p>
                )}

                {product.descripcion && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.descripcion}
                  </p>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.precio.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
