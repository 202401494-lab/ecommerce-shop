import React, { useState, useEffect } from 'react';
import api from './api';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Error cargando pedidos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando pedidos...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel Admin - Pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded">
          <p className="text-gray-600">No hay pedidos aún</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">ID Pedido</p>
                  <p className="font-bold">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="font-bold">{order.userName}</p>
                  <p className="text-sm">{order.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-bold text-lg text-green-600">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p className="font-bold">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    {new Date(order.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-bold mb-2">Productos:</p>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm ml-4">
                      <span>
                        {item.nombre} x{item.quantity}
                      </span>
                      <span>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status === 'completed' ? 'Completado' :
                   order.status === 'pending' ? 'Pendiente' :
                   'Cancelado'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
