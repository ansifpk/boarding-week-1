import useRequest from '@/hooks/useRequest'
import { IUser } from '@/lib/types'
import { removeUser } from '@/redux/slice'
import { userRoute } from '@/service/endPoints'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
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
    <div className='bg-white  flex items-center justify-center gap-150 '>
       <span className='font-extralight text-4xl my-2'>Reciepe World</span>
       <ul className='flex gap-5  my-2'>
         <li  onClick={()=>navigate('/home')}  className='cursor-pointer font-bold'>Home</li>
         <li  onClick={()=>navigate('/recipe')}   className='cursor-pointer font-bold'>Recipe</li>
         {userId?(
        <>
         <li onClick={()=>navigate("/wishlist")} className='cursor-pointer font-bold'>Wishlist</li>
         <li onClick={handleLogout} className='cursor-pointer underline font-bold'>Logout</li>
        </>
         ):(
         <>
          <li  onClick={()=>navigate('/')} className='cursor-pointer font-bold'>Sign In</li>
         </>
         )}
        
       </ul>
    </div>
  )
}

export default Header
