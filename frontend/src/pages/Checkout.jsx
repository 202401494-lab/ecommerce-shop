import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [shippingAddress, setShippingAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!shippingAddress.trim()) {
      alert('Por favor ingresa una dirección de envío')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      
      await axios.post(
        '/api/orders',
        {
          items,
          totalPrice,
          shippingAddress,
          email: user.email
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert('¡Pedido realizado exitosamente! Revisa tu email.')
      clearCart()
      navigate('/account')
    } catch (error) {
      console.error('Error:', error)
      alert('Error al procesar el pedido')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Volver al Catálogo
        </button>
      </div>
    )
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">💳 Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulario */}
        <div className="lg:col-span-2">
          <form onSubmit={handleCheckout} className="bg-white rounded-lg shadow p-8 space-y-6">
            
            <div>
              <label className="block font-semibold mb-2">Nombre Completo</label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full border rounded px-4 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full border rounded px-4 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Dirección de Envío *</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Ingresa tu dirección completa"
                className="w-full border rounded px-4 py-2 h-24 focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition font-bold disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-lg shadow p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6">📋 Resumen</h2>
          
          <div className="space-y-3 mb-6 border-b pb-4">
            {items.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pb-4 border-b">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-lg">Total:</span>
            <span className="text-3xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
