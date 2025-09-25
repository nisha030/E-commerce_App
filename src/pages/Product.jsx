import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

  const {id} = useParams();
  const {products, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [ image, setImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  const fetchProductData = () =>{
    const product = products.find((item)=> item._id === id)
    if(product){
      setProductData(product)
      setImage(product.image[0])
    }
  }

  useEffect(()=>{
    fetchProductData();
  }, [id, products])

  if (!productData) {
    return (
      <div className='border-t-2 pt-10 text-center'>
        <p>Loading product...</p>
      </div>
    )
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100' >
      {/* product data  */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product image  */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image && productData.image.map((img, index)=>(
                <img onClick={()=>setImage(img)} src={img} key={index} alt="" className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:opacity-70 transition-opacity" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image || productData.image[0]} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* product info  */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{productData.name}</h1>
          
          {/* Ratings */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => {
                const rating = 4.5;
                const starNumber = index + 1;
                // For 4.5 rating, show 4 full stars + 1 empty star (common e-commerce pattern)
                const isFilled = starNumber <= Math.floor(rating);
                
                return (
                  <img 
                    key={index} 
                    src={isFilled ? assets.star_icon : assets.star_dull_icon} 
                    alt="star" 
                    className="w-4 h-4" 
                  />
                );
              })}
            </div>
            <span className="text-sm text-gray-600">(4.5)</span>
            <span className="text-sm text-gray-500">• 128 reviews</span>
          </div>
          
          <p className="text-gray-600 mb-4">{productData.description}</p>
          <div className="mb-4">
            <span className="text-3xl font-bold">${productData.price}</span>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Category: {productData.category}</p>
            <p className="text-sm text-gray-500">Type: {productData.subCategory}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Available Sizes:</p>
            <div className="flex gap-2">
              {productData.sizes && productData.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded text-sm transition-colors ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="text-xs text-gray-600 mt-1">Selected: {selectedSize}</p>
            )}
          </div>
          <button onClick={()=> addToCart(id, selectedSize)} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
           <hr className='mt-8 sm:w-4/5 ' />
           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
             <p>100% Original Product</p>
             <p>Cash on Delivery is available on this product</p>
             <p>Easy return and exchange policy within 7 days</p>
           </div>

          </div>
        </div>

        {/* Description and Review section */}
        <div className="mt-16">
          <div className="flex border-b border-gray-200 mb-6">
            <button 
              className={`py-3 px-6 text-lg font-medium ${activeTab === 'description' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`py-3 px-6 text-lg font-medium ${activeTab === 'reviews' ? 'border-b-2 border-teal-500 text-teal-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (128)
            </button>
          </div>

          <div className="py-4">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {productData.description}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This premium quality product is crafted with attention to detail and designed to provide comfort and style. Made from high-quality materials, it offers excellent durability and long-lasting performance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="font-semibold mb-2">Features:</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Premium quality materials</li>
                      <li>• Comfortable fit</li>
                      <li>• Easy to maintain</li>
                      <li>• Durable construction</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Care Instructions:</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Machine washable</li>
                      <li>• Tumble dry low</li>
                      <li>• Do not bleach</li>
                      <li>• Iron on low heat</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
                <div className="space-y-6">
                  {/* Review 1 */}
                  <div className="border p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">John Doe</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <img key={i} src={assets.star_icon} alt="star" className="w-3 h-3" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">5.0</span>
                    </div>
                    <p className="text-gray-700">"Absolutely love this product! The quality is fantastic and it fits perfectly. Highly recommend!"</p>
                    <p className="text-xs text-gray-500 mt-2">Reviewed on January 15, 2024</p>
                  </div>

                  {/* Review 2 */}
                  <div className="border p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">Jane Smith</span>
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <img key={i} src={assets.star_icon} alt="star" className="w-3 h-3" />
                        ))}
                        <img src={assets.star_dull_icon} alt="star" className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-gray-500 ml-2">4.0</span>
                    </div>
                    <p className="text-gray-700">"Good product, but the color was slightly different than expected. Still happy with the purchase."</p>
                    <p className="text-xs text-gray-500 mt-2">Reviewed on February 1, 2024</p>
                  </div>

                  {/* Review 3 */}
                  <div className="border p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">Mike Johnson</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <img key={i} src={assets.star_icon} alt="star" className="w-3 h-3" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">5.0</span>
                    </div>
                    <p className="text-gray-700">"Excellent quality and fast shipping. Will definitely order again!"</p>
                    <p className="text-xs text-gray-500 mt-2">Reviewed on February 10, 2024</p>
                  </div>

                  <button className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
                    Write a Review
                  </button>
                </div>
              </div>
            )}

            {/* display related products  */}
            <RelatedProducts/>

          </div>
        </div>

      </div>
  )
}

export default Product