import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const {setShowSearch, getCartCount, setSearch} = useContext(ShopContext)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Set the search query in context
      setSearch(searchQuery.trim())
      
      // Navigate to collection page with search results
      navigate('/collection')
      
      // Close search input
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <div className='sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200'>
      <div className='flex items-center justify-between py-5 px-4'>
      {/* Logo */}
      <div className="flex items-center">
        <img onClick={() => navigate('/')} src={assets.logo} alt="" className="w-36 cursor-pointer" />
        {/* <h1 className="text-2xl font-bold text-gray-800">TRENDORA<span className="text-pink-500">.</span></h1> */}
      </div>
      
      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 text-sm text-gray-700">
        <li>
          <NavLink to={"/"} className="hover:text-gray-900 transition-colors">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/collection"} className="hover:text-gray-900 transition-colors">
            Collection
          </NavLink>
        </li>
        <li>
          <NavLink to={"/about"} className="hover:text-gray-900 transition-colors">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to={"/contact"} className="hover:text-gray-900 transition-colors">
            Contact
          </NavLink>
        </li>
      </ul>
      
      {/* Right Section - Search, Profile, Cart */}
      <div className="flex items-center gap-3">
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className="w-5 h-5 cursor-pointer" />
        {/* Search */}
        <div className="relative">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                autoFocus
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
              />
              <button
                type="submit"
                className="ml-2 p-1 hover:bg-gray-100 rounded"
              >
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
            </button>
          )}
        </div>
        
        {/* Profile Dropdown */}
        <div className="group relative">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
          <Link to={'/login'}>  <img  src={assets.profile_icon} alt="Profile" className="w-5 h-5" /> </Link>
          </button>
          <div className="group-hover:block absolute hidden right-0 pt-4 z-50">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white shadow-lg border border-gray-200 text-gray-600 rounded-md">
              <p className='cursor-pointer hover:text-black transition-colors'>My Profile</p>
              <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black transition-colors'>My Orders</p>
              <p className='cursor-pointer hover:text-black transition-colors'>Logout</p>
            </div>
          </div>
        </div>
        
        {/* Cart */}
        <Link to='/cart' className="relative p-1 hover:bg-gray-100 rounded transition-colors">
          <img src={assets.cart_icon} alt="Cart" className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </Link>
        <img onClick={()=> setIsVisible(true)} src={assets.menu_icon} alt="" className="w-5 cursor-pointer sm:hidden" />
      </div>
      {/* mobile screen sidebar */}

          <div className={`fixed top-0 left-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${isVisible ? 'w-full' : 'w-0'}`}>
            <div className="flex flex-col text-gray-600">
              <div onClick={()=> setIsVisible(false)} className="flex item-center gap-4 p-3">
                <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
              </div>
              <NavLink onClick={()=> setIsVisible(false)} className="py-2 pl-6 border" to={"/"}>Home</NavLink>
              <NavLink onClick={()=> setIsVisible(false)} className="py-2 pl-6 border" to={"/collection"}>Collection</NavLink>
              <NavLink onClick={()=> setIsVisible(false)} className="py-2 pl-6 border" to={"/about"}>About</NavLink>
              <NavLink onClick={()=> setIsVisible(false)} className="py-2 pl-6 border" to={"/contact"}>Contact</NavLink>
            </div>
          </div>
          

      </div>
    </div>
  )
}

export default Navbar