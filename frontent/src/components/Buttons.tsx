import { useNavigate } from 'react-router-dom';
interface ChildProps{
  text:string
}
const Buttons:React.FC<ChildProps> = ({text}) => {
    const navigate = useNavigate();
  return (
    <div onClick={()=>navigate('/allRecipes')} className='w-25 my-5 md:p-3 sm:p-3 p-2 sm:bg-amber-500  md:bg-gray-800 bg-amber-800 font-bold mx-auto text-card text-center cursor-pointer hover:bg-accent-foreground md:text-lg sm:text-sm text-xs '>
       {text}
    </div>
  )
}

export default Buttons
