import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [currentState, setCurrentState ] = useState('Sign Up')
  const navigate = useNavigate()

  const onSubmitHandler = async(event) =>{
      event.preventDefault();
      // Navigate to home page after login/signup
      navigate('/');
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            {currentState}
          </h2>
          <div className='w-16 h-0.5 bg-gray-800 mx-auto'></div>
        </div>
        
        <form onSubmit={onSubmitHandler} className='mt-6 space-y-6 bg-white p-8 rounded-lg shadow-md'>
          <div className='space-y-4'>
            {currentState === 'Sign Up' && (
              <input 
                type="text" 
                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200' 
                placeholder='Full Name' 
                required 
              />
            )}
            <input 
              type="email" 
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200' 
              placeholder='Email Address' 
              required 
            />
            <input 
              type="password" 
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200' 
              placeholder='Password' 
              required 
            />
          </div>

          <div className='flex items-center justify-between text-sm'>
            <p className='text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200'>
              Forgot your password?
            </p>
            <p 
              onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} 
              className='text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition duration-200'
            >
              {currentState === 'Login' ? 'Create Account' : 'Login Here'}
            </p>
          </div>

          <button 
            type="submit" 
            className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200'
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login