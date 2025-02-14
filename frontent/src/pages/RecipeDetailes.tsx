import Header from '@/components/Header'
import React from 'react'

const RecipeDetailes = () => {
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
