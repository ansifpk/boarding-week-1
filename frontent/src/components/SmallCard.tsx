import { ICuisine } from "@/lib/types";
import  { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
interface ChildProps {
  arr: ICuisine[] ;
}
const SmallCard: FC<ChildProps> = ({ arr }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-8 mx-4">
      {arr.map((val: ICuisine, index) => (
        <div key={index} className="w-[150px]" onClick={()=>navigate(`/detailes?recipeId=${val.id}`)}>
          <div className="w-[150px] h-[150px]">
            <img
              src={val.image}
              alt={val.title}
              className="w-full h-full object-cover rounded-2xl transition-all hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full">
              <i className="bi bi-hand-thumbs-up-fill text-xs text-primary">
                {val.aggregateLikes}
              </i>
              <i className="bi bi-heart-fill text-danger cursor-pointer"></i>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center w-full overflow-hidden text-ellipsis whitespace-nowrap ">
                   
                    <div className="font-bold text-xs ">
                      {
                        val.title
                      }
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-pink-300 text-white">
                {
                        val.title
                      }
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmallCard;
