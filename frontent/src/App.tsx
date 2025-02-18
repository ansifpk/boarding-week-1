import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Login from "./pages/Login";
const Home = lazy(()=>import('./pages/Home'))
const NotFound = lazy(()=>import('./pages/NotFound'))
const Recipe = lazy(()=>import('./pages/Recipe'))
const AllRecipes = lazy(()=>import('./pages/AllRecipes'))
const RecipeDetailes = lazy(()=>import('./pages/RecipeDetailes'))
const Wishlist = lazy(()=>import('./pages/Wishlist'))
const BrickLoader = lazy(()=>import('./components/BrickLoader'))
import { useSelector } from "react-redux";
import { IUser } from "./lib/types";


function App() {
  const _id = useSelector((state: IUser) => state._id);
  return (
    <Suspense fallback={<BrickLoader />}>
      <Routes>
        <Route path="/" element={_id ? <Home /> : <Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe" element={_id ? <Recipe /> : <Login />} />
        <Route path="/allRecipes" element={_id ? <AllRecipes /> : <Login />} />
        <Route
          path="/detailes"
          element={_id ? <RecipeDetailes /> : <Login />}
        />
        <Route path="/wishlist" element={_id ? <Wishlist /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
