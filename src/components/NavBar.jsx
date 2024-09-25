import React from 'react'
import Logo from '../MovieLogo.jpeg'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <>
      <div className='flex border space-x-8 items-center pl-3 py-3 bg-white'>
          <img className='w-[40px]' src={Logo} alt='MovieLogo'/>
          {/* <Link to='Login' className='text-red-700 font-bold text-xl'>Login</Link> */}
          <Link to='/' className='text-orange-500 font-bold text-xl'>STREAM-MOVIES</Link>
          
      </div>
      <div className='pt-8 bg-white'>
        {/* Your content here */}
      </div>
    </>
    
    
  )
}

export default NavBar
