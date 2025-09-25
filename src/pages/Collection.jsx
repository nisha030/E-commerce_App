import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) =>{
    if(selectedCategory.includes(e.target.value)){
      setSelectedCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      setSelectedCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(selectedSubCategory.includes(e.target.value)){
      setSelectedSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSelectedSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice();

    if(search && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(selectedCategory.length > 0){
      productsCopy = productsCopy.filter(item => selectedCategory.includes(item.category))
    }
    
    if(selectedSubCategory.length > 0){
      productsCopy = productsCopy.filter(item => selectedSubCategory.includes(item.subCategory))
    }
    
    const sortedProducts = sortProduct(productsCopy);
    setFilterProducts(sortedProducts)
  }

  const sortProduct = (productsToSort) =>{
    let fpCopy = productsToSort.slice();

    switch(sortType){
      case 'low-high':
        return fpCopy.sort((a,b)=>a.price - b.price);
      case 'high-low':
        return fpCopy.sort((a,b)=>b.price - a.price);
      case 'relevant':
        return fpCopy.sort((a,b)=>b.date - a.date);
      default:
        return fpCopy;
    }
  }



  useEffect(()=>{
    setFilterProducts(products)
  }, [products])

  useEffect(()=>{
    applyFilter()
  }, [selectedCategory, selectedSubCategory, sortType, search, showSearch])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t' >

      {/* filter options */}
      <div className="min-w-60">
      <p onClick={()=> setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-180' : ''} transition-all duration-300`} src={assets.dropdown_icon} alt="" />
      </p>
      {/* category filters  */}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`} >
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Men'} checked={selectedCategory.includes('Men')} onChange={toggleCategory}/> Men
          </p>
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Women'} checked={selectedCategory.includes('Women')} onChange={toggleCategory}/> Women
          </p>
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Kids'} checked={selectedCategory.includes('Kids')} onChange={toggleCategory}/> Kids
          </p>
        </div>
      </div>

      {/* subcategory filter  */}
      <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`} >
        <p className="mb-3 text-sm font-medium">TYPE</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Topwear'} checked={selectedSubCategory.includes('Topwear')} onChange={toggleSubCategory}/> Top Wear
          </p>
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Bottomwear'} checked={selectedSubCategory.includes('Bottomwear')} onChange={toggleSubCategory}/> Bottom Wear
          </p>
          <p className="flex gap-2">
            <input type="checkbox" className="w-3" value={'Winterwear'} checked={selectedSubCategory.includes('Winterwear')} onChange={toggleSubCategory}/> Winter Wear
          </p>
        </div>
      </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <div>
            {search ? (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Search Results for "{search}"
                </h1>
                <p className="text-gray-600">
                  {filterProducts.length} product{filterProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>
            ) : (
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
            )}
          </div>
          {/* product sort  */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Relevant</option>
            <option value="high-low">High-Low</option>
            <option value="low-high">Low-High</option>
          </select>
        </div>

      {/* map products  */}

      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item)=>(
              <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>
      ) : search ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">We couldn't find any products matching "{search}"</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item)=>(
              <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>
      )}

      </div>



    </div>
  )
}

export default Collection