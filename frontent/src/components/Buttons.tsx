import { useNavigate } from 'react-router-dom';

const Buttons = () => {
    const navigate = useNavigate();
  return (
    <div onClick={()=>navigate('/allRecipes')} className='w-25 my-5 p-3 bg-gray-800 font-bold mx-auto text-card text-center cursor-pointer hover:bg-accent-foreground '>
          View All Recipes
    </div>
  )
}

export default Buttons
