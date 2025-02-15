import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Recipe from "./pages/Recipe"
import AllRecipes from "./pages/AllRecipes"
import RecipeDetailes from "./pages/RecipeDetailes"
import Wishlist from "./pages/Wishlist"
import { useSelector } from "react-redux"
import { IUser } from "./lib/types"

function App() {
  const _id = useSelector((state:IUser)=>state._id)
  return (
    <Routes>
       <Route path="/" element={_id?<Home/>:<Login/>} />
       <Route path="/home" element={<Home/>} />
       <Route path="/recipe" element={ _id?<Recipe/>:<Login/>} />
       <Route path="/allRecipes" element={_id?<AllRecipes/>:<Login/>} />
       <Route path="/detailes" element={_id?<RecipeDetailes/>:<Login/>} />
       <Route path="/wishlist" element={_id?<Wishlist/>:<Login/>} />
       <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App
