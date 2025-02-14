import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Recipe from "./pages/Recipe"
import AllRecipes from "./pages/AllREcipes"
import RecipeDetailes from "./pages/RecipeDetailes"

function App() {
  
  return (
    <Routes>
       <Route path="/" element={<Login/>} />
       <Route path="/home" element={<Home/>} />
       <Route path="/recipe" element={<Recipe/>} />
       <Route path="/allRecipes" element={<AllRecipes/>} />
       <Route path="/detailes" element={<RecipeDetailes/>} />
       <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App
