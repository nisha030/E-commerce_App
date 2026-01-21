import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import { products } from '../assets/frontend_assets/assets'

const Review = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [rating, setRating] = useState(0)
  const [deliveryRating, setDeliveryRating] = useState(0)
  const [productReview, setProductReview] = useState('')
  const [deliveryReview, setDeliveryReview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get product data from assets
  const product = products[id] || products[1]

  const handleStarClick = (value, type) => {
    if (type === 'product') {
      setRating(value)
    } else {
      setDeliveryRating(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would typically send the review data to your backend
    console.log({
      orderId: id,
      productRating: rating,
      deliveryRating: deliveryRating,
      productReview: productReview,
      deliveryReview: deliveryReview
    })
    
    setIsSubmitting(false)
    alert('Thank you for your review!')
    navigate('/orders')
  }

  const StarRating = ({ rating, onRatingChange, label }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-2xl transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
          >
            ★
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 && `${rating} out of 5`}
        </span>
      </div>
    </div>
  )

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl mb-8">
        <Title text1={'RATE &'} text2={'REVIEW'} />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4">
            <img src={product.image[0]} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">Order ID: #{id}</p>
              <p className="text-sm text-gray-500">Please rate your experience with this product and delivery</p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold mb-6">Your Review</h4>
          
          {/* Product Rating */}
          <StarRating
            rating={rating}
            onRatingChange={(value) => handleStarClick(value, 'product')}
            label="Rate this product *"
          />

          {/* Product Review */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about this product
            </label>
            <textarea
              value={productReview}
              onChange={(e) => setProductReview(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your thoughts about the product quality, features, etc."
            />
          </div>

          {/* Delivery Rating */}
          <StarRating
            rating={deliveryRating}
            onRatingChange={(value) => handleStarClick(value, 'delivery')}
            label="Rate the delivery experience *"
          />

          {/* Delivery Review */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about the delivery
            </label>
            <textarea
              value={deliveryReview}
              onChange={(e) => setDeliveryReview(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your experience with packaging, delivery time, delivery person, etc."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0 || deliveryRating === 0}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>

        {/* Review Guidelines */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h5 className="font-semibold mb-2">Review Guidelines</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Be honest and specific about your experience</li>
            <li>• Focus on the product quality and delivery service</li>
            <li>• Avoid personal information or inappropriate content</li>
            <li>• Your review helps other customers make informed decisions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Review
