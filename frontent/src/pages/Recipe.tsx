import BrickLoader from '@/components/BrickLoader'
import Buttons from '@/components/Buttons'
import Cards from '@/components/Cards'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Input } from '@/components/ui/input'
// import useRequest from '@/hooks/useRequest'

// import { IUser, IWishlist } from '@/lib/types'
// import { wishlistRoute } from '@/service/endPoints'
import axios from 'axios'

import  { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'


const Recipe = () => {
    const [search,setSearch] = useState("");
    const [datas,setDatas] = useState([]);
    // const id = useSelector((state: IUser) => state._id);
    //  const [wishlist, setWishlist] = useState<IWishlist|null>(null);
  
    useEffect(()=>{
        const fetching = async () =>{
         const {data} = await axios.get(`${import.meta.env.VITE_SPOONACULAR_API}/complexSearch?sort=popularity&number=10&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`)
         setDatas(data.results);   
         
         
        }
        fetching()
    },[]);
 
    if(!datas.length){
      return(
        <>
         <BrickLoader/>
        </>
      )
    }

  return (
    <div className='bg-pink-100'>
        <Header />
        {/* search and about part start */}
       <div className='flex flex-col gap-5 py-4 justify-center items-center text-white  text-center bg-fuchsia-600 '>
         <span className='text-5xl font-bold'>Recipes</span>
         <div className='text-center w-75 text-lg text-gray-400 font-serif'>
           Welcome to Recipr World . We provide the recipe of the world famous dishes all around this world. We make sure that everything you want will get in here.Exploring recipes from Recipe Wold is totally free and you can experience all the famous and tasty foodes all around this world.
         </div>
         <div className='flex w-full gap-1 justify-center items-center'>
           <Input type="search" className='bg-white text-black w-50' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search recipe here' />
         </div>
       </div>
       {/* search and about part end */}

       {/* list recipes start */}
        <div className=' text-center mt-4'>
           <span className='text-3xl font-bold'>Most Liked Recipes</span>
        </div>
        <Cards arr={datas}  />
       {/* list recipes end */}
        
        <Buttons/>
       
       <Footer/>
    </div>
  )
}

export default Recipe
