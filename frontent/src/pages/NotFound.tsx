import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-5 bg-pink-200 h-screen justify-center text-white items-center'>
        <span className='text-5xl font-bold underline'>404 | Page Not Fount</span>
         <p className='font-bold underline cursor-pointer' onClick={()=>navigate('/home')}>Go To Home</p>
    </div>
  )
}

export default NotFound
