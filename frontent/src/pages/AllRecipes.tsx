import Cards from "@/components/Cards"
import Header from "@/components/Header"

 
const AllRecipes = () => {
  return (
    <div className='bg-pink-50 h-screen'>
        <Header/>
         <div className="text-center font-bold text-2xl text-yellow-400 my-4 underline">
            ALL RECIPES
         </div>
        <div>
          <Cards arr={[1,2,3,4,5,6,7,8]} />
        </div>
    </div>
  )
}

export default AllRecipes
