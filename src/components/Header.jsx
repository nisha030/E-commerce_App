import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col lg:flex-row min-h-[500px] bg-gray-50'>
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-16 px-8">
        <div className="text-[#414141] max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 md:w-12 h-[2px] bg-[#414141]"></div>
            <p className='font-medium text-sm md:text-base tracking-wider'>OUR BESTSELLERS</p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-3 cursor-pointer group">
            <p className='font-semibold text-sm md:text-base group-hover:text-gray-600 transition-colors'>Shop Now</p>
            <div className='w-8 md:w-12 h-[2px] bg-[#414141] group-hover:w-16 transition-all duration-300'></div>
          </div>
        </div>
      </div>
      
      {/* Right Section - Hero Image */}
      <div className="w-full lg:w-1/2 relative">
        <img 
          src={assets.hero_img} 
          alt="Latest Arrivals" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-50/20"></div>
      </div>
    </div>
  )
}

export default Header