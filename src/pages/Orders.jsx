import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const {currency, getOrders, user} = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        const result = await getOrders();
        if (result.success) {
          setOrders(result.orders);
        }
      }
      setLoading(false);
    };
    loadOrders();
  }, [user, getOrders]);

  const getStatusText = (status) => {
    switch(status) {
      case 'shipped': return 'Shipped';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return 'Ready To Ship';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'shipped': return 'bg-blue-500';
      case 'out_for_delivery': return 'bg-yellow-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/order-tracking/${orderId}`);
  };

  if (!user) {
    return (
      <div className='border-t pt-16'>
        <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERS'}  />
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600">Please login to view your orders</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='border-t pt-16'>
        <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERS'}  />
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t pt-16' >
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}  />
      </div>
      <div>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          orders.map((order)=>(
            <div key={order._id} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex item-start gap-6 text-sm">
                <img src={order.items[0]?.product?.images[0] || '/placeholder.jpg'} alt="" className="w-16 sm:w-20" />
                <div>
                  <p className="sm:text-base font-medium">{order.items[0]?.product?.name || 'Product'} </p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className='text-lg' >{currency}{order.total} </p>
                    <p className='px-2 sm:px-3 sm:py-1 text-black-50 border border-slate-500 rounded-md'>{order.items[0]?.size}</p>
                    <p className='text-base'> {order.items[0]?.quantity} </p>
                  </div>
                  <p className="mt-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">Order ID: {order.orderNumber}</p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className={`min-w-2 h-2 rounded-full ${getStatusColor(order.orderStatus)}`}></p>
                  <p className="text-sm md:text-base">{getStatusText(order.orderStatus)}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleTrackOrder(order._id)}
                    className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50"
                  >
                    Track Your Order
                  </button>
                  {order.orderStatus === 'delivered' && (
                    <button 
                      onClick={() => navigate(`/review/${order._id}`)}
                      className="border px-4 py-2 text-sm font-medium rounded-sm bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Rate & Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders