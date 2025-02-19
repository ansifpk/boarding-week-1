import Buttons from '@/components/Buttons'
import Cards from '@/components/Cards'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ICuisine } from '@/lib/types'
import axios from 'axios'
import  { useEffect, useState } from 'react'


const Home = () => {
  // const [homePageRecipes,setHomePageRecipes] = useState([])
 
  const [categories,setCategories] = useState<ICuisine[]>([])
 
  
   useEffect(()=>{
     const fetching = async()=>{
        const { data } = await axios.get(`${import.meta.env.VITE_SPOONACULAR_API}/complexSearch?cuisine=Italian,Mexican,Indian,Chinese,French,Thai,Japanese,Greek,Spanish,Moroccan&number=6&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`)
        setCategories(data.results)
      }
     fetching()
   
    
  },[]) 

  return (
    <div className='bg-pink-50'>
       <Header/>
       <div className='bg-white text-center font-bold border-t py-3'>
        <span >Simple And Tasty Recipes </span>
       </div>
        {/* welcome recipe start */}
       <div className='flex justify-center gap-5 m-4'>
        <div className='flex flex-col h-[400px] w-25 items-center'>
          <img src={`https://img.spoonacular.com/recipes/639333-636x393.jpg`} alt={"recipe.title"} className='w-full h-full object-cover' />
          <span className='font-bold bg-amber-300 p-2'>VEGETARIAN</span>
        </div>
        <div className='flex flex-col h-[400px] w-25 items-center'>
          <img src={`https://img.spoonacular.com/recipes/982376-636x393.jpg`} alt={"recipe.title"} className='w-full h-full object-cover' />
          <span className='font-bold bg-amber-300 p-2'>NON-VEGETARIAN</span>
        </div>
       </div>
        {/* welcome recipe end */}

        {/* 10 Categories start*/}
      {/* <div className='flex gap-12 items-center justify-center'>
        {categories.map((cate,index)=>(
          <li key={index} className=' w-[100px]   list-none items-center justify-center'>
             <div className='flex  h-[100px] w-[100px]  items-center'>
               <img src={`https://img.spoonacular.com/recipes/982376-636x393.jpg`} className='w-full h-full object-cover rounded-full' alt="" />
               </div>
                <span className='font-semibold text-sm'>{cate.title}</span>
          </li>
        ))}
      </div> */}
      <Cards arr={categories} />
       {/* 10 Categories end*/}

       {/* view full recipe start*/}
       <Buttons/>
       {/* view full recipe end*/}
        <Footer/>
    </div>
  )
}

export default Home
