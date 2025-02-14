import { ICuisine } from '@/lib/types';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

interface ChildProps {
    arr: ICuisine[];
}

const Cards:React.FC<ChildProps> = ({arr}) => {
    const navigate = useNavigate();
   
  return (
    <div className='grid grid-cols-3 w-75 mx-auto mt-4'>
          {arr.map((val:ICuisine,index)=>(
            <div key={index} className='w-[250px]' onClick={()=>navigate(`/detailes?recipeId=${val.id}`)}>
            <div className='w-[250px] h-[250px]'>
                <img src={val.image} className='w-full p-1 h-full object-cover' alt={val.image} />   
            </div>
            <div className='flex flex-col items-center'>
                <div className='flex justify-between w-full'>
                <i className="bi bi-hand-thumbs-up-fill text-primary">{val.aggregateLikes}</i>
                  <i className="bi bi-heart-fill text-danger"></i> 
                </div>
  
                <div className='text-center '>
                    <span className='text-sm font-medium' >4 reviews/4.9 Avarage</span>
                    <div className='font-bold'>{val.title}</div>
                </div>
            </div>
          </div>
          ))}
       </div>
  )
}

export default Cards
