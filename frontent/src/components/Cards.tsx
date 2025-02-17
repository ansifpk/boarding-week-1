import useRequest from '@/hooks/useRequest';
import { ICuisine, IUser, IWishlist } from '@/lib/types';
import { wishlistRoute } from '@/service/endPoints';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ChildProps {
    arr: ICuisine[];
}

const Cards:React.FC<ChildProps> = ({arr}) => {
    const navigate = useNavigate();
    const id = useSelector((state: IUser) => state._id);
    const [wishlist, setWishlist] = useState<IWishlist>();
        const { doRequest } = useRequest({
            url: `${wishlistRoute.wishlist}/${id}`,
            method: "get",
            body: {},
            onSuccess: () => {},
          });
    useEffect(()=>{
        const fetching = async () =>{ 
         const data = await doRequest()
         setWishlist(data.wishlist);
        }
        fetching()
    },[]);

    const handleWishlist = (id:number)=>{
      
      console.log(id);
      
    }


   if(arr.length ==0){
    return (
       <div className='flex  h-full w-full'>
         <span className='mx-auto mt-52 font-bold text-1xl'>No Favorite items</span>
       </div>
    )
   }

  return (
    <div className='grid grid-cols-3 w-75 mx-auto mt-4'>
          {
          arr.map((val:ICuisine,index)=>(
            <div key={index} className='w-[250px]' >
            <div onClick={()=>navigate(`/detailes?recipeId=${val.id}`)} className='w-[250px] h-[250px]'>
                <img src={val.image} className='w-full p-1 h-full object-cover' alt={val.image} />   
            </div>
            <div className='flex flex-col items-center'>
                <div className='flex justify-between w-full'>
                  {val.aggregateLikes&&<i className="bi bi-hand-thumbs-up-fill text-primary">{val.aggregateLikes}</i>}
                  <i onClick={()=>handleWishlist(val.id)} className={`bi-heart-fill text-danger cursor-pointer`}></i> 
                </div>
  
                <div className='text-center ' onClick={()=>navigate(`/detailes?recipeId=${val.id}`)}>
                    {/* <span className='text-sm font-medium' >4 reviews/4.9 Avarage</span> */}
                    <div className='font-bold'>{val.title}</div>
                </div>
            </div>
          </div>
          ))
          }
       </div>
  )
}

export default Cards
