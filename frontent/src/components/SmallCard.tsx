import { ICuisine, IUser, IWishlist } from "@/lib/types";
import  { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import useRequest from "@/hooks/useRequest";
import { wishlistRoute } from "@/service/endPoints";
import { useSelector } from "react-redux";
import { toast } from "sonner";
interface ChildProps {
  arr: ICuisine[] ;
}
const SmallCard: FC<ChildProps> = ({ arr }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<IWishlist | null>(null);
  const id = useSelector((state: IUser) => state._id);
      const { doRequest: getRequest,errors:getErrors } = useRequest({
        url: `${wishlistRoute.wishlist}/${id}`,
        method: "get",
        body: {},
        onSuccess: () => {},
      });
     const { doRequest: postRequest,errors:postErrors } = useRequest({
        url: `${wishlistRoute.wishlist}/${id}`,
        method: "post",
        body: {},
        onSuccess: () => {},
      });
      const { doRequest: patchRequest,errors:patchErrors } = useRequest({
        url: `${wishlistRoute.wishlist}/${id}`,
        method: "patch",
        body: {},
        onSuccess: () => {},
      });
    useEffect(()=>{
      const fetching = async () =>{
        const data = await getRequest()
        setFavorites(data.wishlist);
      }
      fetching();
    },[])
   
   
    const handleWishlist = async (recipeId: number) => {
      if (favorites == null) {
       
        const response = await postRequest({ recipeId });
        setFavorites(response.wishlist);
      } else {
        
        const response = await patchRequest({ recipeId: recipeId });
        setFavorites(response.wishlist);
      }
    };
    useEffect(()=>{
      getErrors?.length!>0&&getErrors!.map((err)=>toast.error(err.message))
      postErrors?.length!>0&&postErrors!.map((err)=>toast.error(err.message))
      patchErrors?.length!>0&&patchErrors!.map((err)=>toast.error(err.message))
    },[getErrors,postErrors,patchErrors])
  return (
    <div className="grid md:grid-cols-8 grid-cols-5 md:mx-4 mx-2">
      {arr.map((val: ICuisine, index) => (
        <div key={index} className="md:w-[150px] w-[90px]" >
          <div onClick={()=>navigate(`/detailes?recipeId=${val.id}`)} className="md:w-[150px] md:h-[150px] w-[90px]">
            <img
              src={val.image}
              alt={val.title}
              className="w-full h-full object-cover rounded-2xl transition-all hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-center">
            <div  onClick={() => handleWishlist(val.id)} className="flex justify-between w-full">
             
              <i className={`bi ${favorites?.recipes.includes(val.id)
                        ? "bi-heart-fill"
                        : "bi-heart"
                    } text-danger cursor-pointer`}></i>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center w-full overflow-hidden text-ellipsis whitespace-nowrap ">
                   
                    <div onClick={()=>navigate(`/detailes?recipeId=${val.id}`)} className="font-bold text-xs cursor-pointer">
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
