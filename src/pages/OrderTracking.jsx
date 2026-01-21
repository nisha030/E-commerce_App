import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const OrderTracking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currency, getOrderTracking, user } = useContext(ShopContext)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrder = async () => {
      if (user && id) {
        const result = await getOrderTracking(id);
        if (result.success) {
          setOrder(result.order);
        }
      }
      setLoading(false);
    };
    loadOrder();
  }, [user, id, getOrderTracking]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'ordered': return '📝'
      case 'confirmed': return '✅'
      case 'shipped': return '📦'
      case 'in_transit': return '🚚'
      case 'out_for_delivery': return '🚛'
      case 'delivered': return '🏠'
      default: return '⏳'
    }
  }

  const getStatusColor = (status, currentStatus) => {
    const statusOrder = ['ordered', 'confirmed', 'shipped', 'in_transit', 'out_for_delivery', 'delivered']
    const currentIndex = statusOrder.indexOf(currentStatus)
    const statusIndex = statusOrder.indexOf(status)
    
    if (statusIndex <= currentIndex) {
      return 'text-green-600 bg-green-100'
    }
    return 'text-gray-400 bg-gray-100'
  }

  const getProgressPercentage = (currentStatus) => {
    const statusOrder = ['ordered', 'confirmed', 'shipped', 'in_transit', 'out_for_delivery', 'delivered']
    const currentIndex = statusOrder.indexOf(currentStatus)
    return ((currentIndex + 1) / statusOrder.length) * 100
  }

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl mb-8">
        <Title text1={'ORDER'} text2={'TRACKING'} />
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img src={order.product.image[0]} alt={order.product.name} className="w-24 h-24 object-cover rounded-lg" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{order.product.name}</h3>
            <div className="flex items-center gap-4 text-gray-600 mb-2">
              <span className="text-lg font-medium">{currency}{order.product.price}</span>
              <span className="px-3 py-1 bg-gray-100 rounded-md">{order.product.size}</span>
              <span>Qty: {order.product.quantity}</span>
            </div>
            <p className="text-sm text-gray-500">Order Date: {new Date(order.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Tracking Number: {order.trackingNumber}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h4 className="text-lg font-semibold mb-4">Order Progress</h4>
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            {order.timeline.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${getStatusColor(step.status, order.status)}`}>
                  {getStatusIcon(step.status)}
                </div>
                <span className="text-xs text-center max-w-20">{step.status.replace('_', ' ').toUpperCase()}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 rounded-full">
            <div 
              className="h-1 bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage(order.status)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4">Order Timeline</h4>
        <div className="space-y-4">
          {order.timeline.map((step, index) => (
            <div key={index} className={`flex items-start gap-4 p-4 rounded-lg ${getStatusColor(step.status, order.status)}`}>
              <div className="text-2xl">{getStatusIcon(step.status)}</div>
              <div className="flex-1">
                <p className="font-medium">{step.description}</p>
                <p className="text-sm opacity-75">{step.date} at {step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={() => navigate('/orders')}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back to Orders
        </button>
        {order.status === 'delivered' && (
          <button 
            onClick={() => navigate(`/review/${order.id}`)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Rate & Review
          </button>
        )}
      </div>
    </div>
  )
}

export default OrderTracking
