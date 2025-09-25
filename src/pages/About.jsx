import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Light Background and Bubbles */}
      <div className="relative text-gray-800 py-20 overflow-hidden">
        {/* Light Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
          {/* Moving Bubbles */}
          <div className="absolute inset-0">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-2"></div>
            <div className="bubble bubble-3"></div>
            <div className="bubble bubble-4"></div>
            <div className="bubble bubble-5"></div>
            <div className="bubble bubble-6"></div>
            <div className="bubble bubble-7"></div>
            <div className="bubble bubble-8"></div>
            <div className="bubble bubble-9"></div>
            <div className="bubble bubble-10"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="block">ABOUT</span>
            <span className="block text-blue-600">US</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
            Discover the story behind Trendora and our commitment to excellence
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <img 
              src={assets.about_img} 
              alt="About Trendora" 
              className="w-full h-96 object-cover rounded-2xl shadow-2xl" 
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Trendora was born out of a passion for innovation and a desire to help customers 
                discover, explore, and purchase a wide range of products from the comfort of their homes.
              </p>
              <p className="text-lg">
                Since our inception, we've worked tirelessly to curate a diverse selection of 
                high-quality products that cater to every taste and preference. From fashion and 
                beauty to electronics and home essentials, we offer an extensive collection that 
                caters to every lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Trendora, we believe in delivering the best possible shopping experience. 
              Our user-friendly platform ensures a seamless and enjoyable shopping journey, 
              with secure payment options and fast shipping services.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We're committed to providing our customers with the highest level of customer 
              service and support. Thank you for choosing Trendora. We look forward to serving 
              you and helping you discover your next favorite product.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="block">WHY</span>
            <span className="block text-blue-600">CHOOSE US</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center group">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
            <p className="text-gray-600 leading-relaxed">
              We meticulously select and vet each product to ensure it meets our stringent quality standards.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center group">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Convenience</h3>
            <p className="text-gray-600 leading-relaxed">
              With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center group">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors duration-300">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Exceptional Service</h3>
            <p className="text-gray-600 leading-relaxed">
              Our team of dedicated professionals is here to assist you every step of the way. 
              Ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About