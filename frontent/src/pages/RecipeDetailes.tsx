import Header from '@/components/Header'
import { IRecipe } from '@/lib/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const RecipeDetailes = () => {
  const [recipe,setRecipe] = useState<IRecipe>()
  const [recipeId] = useSearchParams()
 const id =  recipeId.get('recipeId')
  useEffect(()=>{
    const fetching = async()=>{
         const {data} = await axios.get(`${import.meta.env.VITE_SPOONACULAR_API}/${id}/information?includeNutrition=true&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`)
         setRecipe(data)
        }
    fetching()
  },[id])
  console.log(recipe);
  
  return (
    <div className='bg-pink-50'>
       <Header />
       <div className='container '>
         
       <div className="flex gap-5 mt-5">
         <div className='w-75 '>
            <div className='font-semibold text-4xl font-serif'>
               The Best Soft Chocolate  Chip Cookies
            </div>
            <div className='h-[400px] w-full'>
              <img src={`https://img.spoonacular.com/recipes/639333-636x393.jpg`} alt={"recipe.title"} className='w-full h-full object-cover' />
            </div>
          </div>    
          <div className='w-25 h-[350px]'>
            <img src={`https://img.spoonacular.com/recipes/639333-636x393.jpg`} alt={"recipe.title"} className='w-full h-full object-cover' />
          </div>    
       </div>
       </div>
    </div>
  )
}

export default RecipeDetailes
