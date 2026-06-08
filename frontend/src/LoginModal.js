import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [nombreFerreteria, setNombreFerreteria] = useState('');
  const [nombreEncargado, setNombreEncargado] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Por favor ingresa un correo electrónico');
      return;
    }
    if (!nombreFerreteria) {
      alert('Por favor ingresa el nombre de la ferretería');
      return;
    }
    if (!nombreEncargado) {
      alert('Por favor ingresa el nombre del encargado');
      return;
    }

    setLoading(true);
    try {
      // Enviar nombre encargado como "name" al backend
      await onLogin(email, nombreEncargado);
      setEmail('');
      setNombreFerreteria('');
      setNombreEncargado('');
      onClose();
    } catch (error) {
      alert('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Ferretería <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nombreFerreteria}
              onChange={(e) => setNombreFerreteria(e.target.value)}
              placeholder="Tu nombre de ferretería"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de Encargado <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nombreEncargado}
              onChange={(e) => setNombreEncargado(e.target.value)}
              placeholder="Nombre del encargado"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center text-sm text-gray-600">
          <p>Usa cualquier correo para probar la app</p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
