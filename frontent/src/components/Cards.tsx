import useRequest from "@/hooks/useRequest";
import { ICuisine, IUser, IWishlist } from "@/lib/types";
import { wishlistRoute } from "@/service/endPoints";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

interface ChildProps {
  arr: ICuisine[] | null;
}

const Cards: React.FC<ChildProps> = ({ arr }) => {
  const navigate = useNavigate();
  const location = useLocation();
  

  const id = useSelector((state: IUser) => state._id);
  const [favorites, setFavorites] = useState<IWishlist | null>(null);
  const [wishlist, setWishlist] = useState<ICuisine[]>();
   useEffect(()=>{
    if(location.pathname == "/wishlist" && wishlist ! == null){
      let ids =favorites?.recipes.join(",")
       const fetching = async () =>{
        const {data} = await axios.get(`${import.meta.env.VITE_SPOONACULAR_API}/informationBulk?ids=${ids}&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`);
        setWishlist(data);
       }
       fetching()
        
    }
   },[favorites])
  const { doRequest: getRequest } = useRequest({
    url: `${wishlistRoute.wishlist}/${id}`,
    method: "get",
    body: {},
    onSuccess: () => {},
  });
  const { doRequest: postRequest } = useRequest({
    url: `${wishlistRoute.wishlist}/${id}`,
    method: "post",
    body: {},
    onSuccess: () => {},
  });
  const { doRequest: patchRequest } = useRequest({
    url: `${wishlistRoute.wishlist}/${id}`,
    method: "patch",
    body: {},
    onSuccess: () => {},
  });
  useEffect(() => {
    const fetching = async () => {
      const data = await getRequest();
      setFavorites(data.wishlist);
    };
    fetching();
  }, []);

  const handleWishlist = async (recipeId: number) => {
    if (favorites == null) {
     
      const response = await postRequest({ recipeId });
      setFavorites(response.wishlist);
    } else {
      
      const response = await patchRequest({ recipeId: recipeId });
      setFavorites(response.wishlist);
    }
  };

  if (arr?.length == 0 && favorites !== null) {
    return (
      <div className="flex  h-full w-full">
        <span className="mx-auto mt-52 font-bold text-1xl">
          No Favorite items
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 w-75 mx-auto mt-4">
      {location.pathname == "/wishlist" ? (
        <>
          {wishlist?.map((val,index)=>(
              <div key={index} className="w-[250px]">
              <div
                onClick={() => navigate(`/detailes?recipeId=${val.id}`)}
                className="w-[250px] h-[250px]"
              >
                <img
                  src={val.image}
                  className="w-full p-1 h-full object-cover"
                  alt={val.image}
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="flex justify-between w-full">
                  {/* {val.aggregateLikes && (
                    <i className="bi bi-hand-thumbs-up-fill text-primary">
                      {val.aggregateLikes}
                    </i>
                  )} */}
                  <i
                    onClick={() => handleWishlist(val.id)}
                    className={`${
                      favorites?.recipes.includes(val.id)
                        ? "bi-heart-fill"
                        : "bi-heart"
                    } text-danger cursor-pointer`}
                  ></i>
                </div>
  
                <div
                  className="text-center "
                  onClick={() => navigate(`/detailes?recipeId=${val.id}`)}
                >
                  {/* <span className='text-sm font-medium' >4 reviews/4.9 Avarage</span> */}
                  <div className="font-bold">{val.title}</div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        //  for recipe page start
        arr?.map((val: ICuisine, index) => (
          <div key={index} className="w-[250px]">
            <div
              onClick={() => navigate(`/detailes?recipeId=${val.id}`)}
              className="w-[250px] h-[250px]"
            >
              <img
                src={val.image}
                className="w-full p-1 h-full object-cover"
                alt={val.image}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-between w-full">
                {val.aggregateLikes && (
                  <i className="bi bi-hand-thumbs-up-fill text-primary">
                    {val.aggregateLikes}
                  </i>
                )}
                <i
                  onClick={() => handleWishlist(val.id)}
                  className={`${
                    favorites?.recipes.includes(val.id)
                      ? "bi-heart-fill"
                      : "bi-heart"
                  } text-danger cursor-pointer`}
                ></i>
              </div>

              <div
                className="text-center "
                onClick={() => navigate(`/detailes?recipeId=${val.id}`)}
              >
                {/* <span className='text-sm font-medium' >4 reviews/4.9 Avarage</span> */}
                <div className="font-bold">{val.title}</div>
              </div>
            </div>
          </div>
        ))
        //  for recipe page end
      )}
    </div>
  );
};

export default Cards;
