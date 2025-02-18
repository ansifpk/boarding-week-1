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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRecipe } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const AllRecipes = () => {
  const [count, setCount] = useState(1);
  const [pages] = useState(5229);
  const [sort, setSort] = useState("All");
  const [recipe, setRecipe] = useState<IRecipe[]>([]);
  useEffect(() => {
    const fetching = async () => {
      let url = `${import.meta.env.VITE_SPOONACULAR_API}/complexSearch?offset=${
        count * 9
      }&number=9&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`;
      if (sort !== "All") {
        url += `&${sort}`;
      }

      const { data } = await axios.get(url);
      setRecipe(data.results);
    };
    fetching();
  }, [count,sort]);

  if (!recipe.length) {
    return (
      <>
        <BrickLoader />
      </>
    );
  }
  return (
    <div className="bg-pink-50">
      <Header />
      <div className="text-center font-bold text-2xl text-yellow-400 my-4 underline">
        ALL RECIPES
      </div>
      <div className="flex">
        <div className="w-[250px]">
        <Select
          onValueChange={(value) => {
            setSort(value);
          }}
          defaultValue={sort}
          
        >
          <SelectTrigger className="w-[180px] mx-auto">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              <SelectLabel>Sort</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="sort=price&sortDirection=desc">
                Price High
              </SelectItem>
              <SelectItem value="sort=price&sortDirection=asc">
                Price Low
              </SelectItem>
              <SelectItem value="sort=readyInMinutes&sortDirection=asc">
                Coking Time Fast
              </SelectItem>
            
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
        <div className="w-full">
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
