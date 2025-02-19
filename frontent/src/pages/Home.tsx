import Buttons from '@/components/Buttons'
import Cards from '@/components/Cards'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ICuisine } from '@/lib/types'
import axios from 'axios'
import  { useEffect, useState } from 'react'


const Home = () => {
  
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
      
        {/* welcome recipe end */}

        {/* 10 Categories start*/}
     
       <div className='bg-white text-center font-bold border-t py-3'>
       <span>You May Lie This</span>
       </div>
     
     
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
