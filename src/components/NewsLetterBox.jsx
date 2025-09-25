import React from 'react'

const NewsLetterBox = () => {
  const  handleSubmit = (e) =>{
    e.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className="text-2xl font-medium text-gray-800">Subscribe Now & Get Flat 20% Off</p>
        <p className="text-gray-500 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus optio ab ad suscipit voluptatibus voluptatem quam.
        </p>
        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border pl-3' >
            <input type="email" className="w-full sm:flex-1 outline-none" placeholder="Enter your email" required />
            <button type='submit' className='text-white bg-black text-xs px-10 py-4'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox;