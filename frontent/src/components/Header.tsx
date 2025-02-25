import useRequest from '@/hooks/useRequest'
import { IUser } from '@/lib/types'
import { removeUser } from '@/redux/slice'
import { userRoute } from '@/service/endPoints'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [open,setOpen] = useState(false)
    const userId = useSelector((state:IUser)=>state._id)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {doRequest} = useRequest({
        url:userRoute.signOut,
        method:"post",
        body:{},
        onSuccess:()=>navigate("/")
    })
    const handleLogout = async() => {
       await doRequest();
       dispatch(removeUser())
    }
  return (
    <>
     <div className='bg-white  flex items-center justify-between md:px-5 lg:px-5 sm:px-5 px-2'>
       <span className='font-extralight md:text-4xl my-2 sm:text-2xl '>Reciepe World</span>
       <div className='md:hidden flex'>
          {open?(
            <div>
             <i className="bi bi-x-lg " onClick={()=>setOpen(!open)}></i>
             {open&&(
                <ul className='flex flex-col absolute left-0 bg-pink-50 w-full gap-2'>
                <li  onClick={()=>navigate('/home')}  className='cursor-pointer font-bold md:text-base sm:text-base text-xs'>Home</li>
                <li  onClick={()=>navigate('/recipe')}   className='cursor-pointer font-bold md:text-base sm:text-base text-xs' >Recipe</li>
                {userId?(
               <>
                <li onClick={()=>navigate("/wishlist")} className='cursor-pointer font-bold md:text-base sm:text-base text-xs'>Wishlist</li>
                <li onClick={handleLogout} className='cursor-pointer underline font-bold md:text-base sm:text-base text-xs'>Logout</li>
               </>
                ):(
                <>
                 <li  onClick={()=>navigate('/')} className='cursor-pointer font-bold md:text-base sm:text-base text-xs'>Sign In</li>
                </>
                )}
              </ul>
             )}
            </div>
          ):(
            <i className="bi bi-list" onClick={()=>setOpen(!open)}></i>
          )}
       </div>
       
       <ul className='md:flex md:gap-5 gap-3  my-2 hidden'>
         <li  onClick={()=>navigate('/home')}  className='cursor-pointer font-bold md:text-base sm:text-base text-xs'>Home</li>
         <li  onClick={()=>navigate('/recipe')}   className='cursor-pointer font-bold md:text-base sm:text-base text-xs' >Recipe</li>
         {userId?(
        <>
         <li onClick={()=>navigate("/wishlist")} className='cursor-pointer font-bold md:text-base sm:text-base text-xs'>Wishlist</li>
         <li onClick={handleLogout} className='cursor-pointer underline font-bold md:text-base sm:text-base text-xs'>Logout</li>
        </>
         ):(
         <>
          <li  onClick={()=>navigate('/')} className='cursor-pointer font-bold md:text-base sm:text-base text-xs'>Sign In</li>
         </>
         )}
       </ul>
    </div>
    <div>
    
    </div>
    </>
  )
}

export default Header
