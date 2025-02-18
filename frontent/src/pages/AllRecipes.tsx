import BrickLoader from "@/components/BrickLoader";
import Cards from "@/components/Cards";
import Header from "@/components/Header";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { IRecipe } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const AllRecipes = () => {
  const [count, setCount] = useState(1);
  const [pages] = useState(5229);
  const [sort] = useState('');
  const [recipe, setRecipe] = useState<IRecipe[]>([]);
  useEffect(() => {
    const fetching = async () => {
      let url = `${
        import.meta.env.VITE_SPOONACULAR_API
      }/complexSearch?offset=${count * 9}&number=9&apiKey=${
        import.meta.env.VITE_SPOONACULAR_API_KEY
      }`;
      if (sort) {
        url += `&sort=${sort}&sortDirection=asc`; 
      }

      const { data } = await axios.get(url);
      setRecipe(data.results);
    };
    fetching()
  }, [count]);

  if(!recipe.length){
    return(
      <>
        <BrickLoader/>
      </>
    )
  }
  return (
    <div className="bg-pink-50">
      <Header />
      <div className="text-center font-bold text-2xl text-yellow-400 my-4 underline">
        ALL RECIPES
      </div>
      <div className="flex">
         <div>
           <select>
             <option>hye</option>
             <option>bye</option>
             <option>hi</option>
           </select>
         </div>
         <div>
        {/* body part start */}
        <Cards arr={recipe} />
        {/* body part end  */}

        {/* pagination start */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  count > 1 ? setCount(count - 1) : setCount(count);
                }}
                className="text-black cursor-pointer"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="text-black cursor-pointer" isActive>
                {count}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  count !== pages ? setCount(count + 1) : setCount(count);
                }}
                className="text-black cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* pagination end */}
      </div>
      </div>
    </div>
  );
};

export default AllRecipes;
