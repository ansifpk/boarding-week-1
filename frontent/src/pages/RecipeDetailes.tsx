import BrickLoader from "@/components/BrickLoader";
import Header from "@/components/Header";
import { IRecipe } from "@/lib/types";
import axios from "axios";
import  { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const RecipeDetailes = () => {
  const [recipe, setRecipe] = useState<IRecipe>();
  const [image, setImag] = useState<string>("");
  const [recipeId] = useSearchParams();
  const id = recipeId.get("recipeId");
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SPOONACULAR_API
        }/${id}/information?includeNutrition=true&apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`
      );
      const res = await axios.get(
        `${import.meta.env.VITE_SPOONACULAR_API}/${id}/card?apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`
      );
      setRecipe(data);
      setImag(res.data.url);
    };
    fetching();
  }, [id]);
  
  let str =
    'You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669">Pasta with Garlic,Scallions, Cauliflower & Breadcrumbs</a>.';
   
    if(!recipe){
      return (
        <>
          <BrickLoader />
        </>
      );
    }
 
    return (
    <div className="bg-pink-50">
      <Header />
      <div className="container">
        <div className="flex gap-5 mt-5">
          <div className="w-75 ">
            <div className="font-semibold text-4xl font-serif">
              The Best Soft Chocolate Chip Cookies
            </div>
            <div className=" w-full">
              <img
                src={recipe?.image}
                alt={"recipe.title"}
                className="w-full h-full object-cover"
              />
              <span>
                {str
                  .replace(/<\/?b>/g, "")
                  .replace(/<\/?a/g, "")
                  .replace(/\/?a>/g, "")
                  .replace(/</g, "")
                  .replace(/>/g, "")}
              </span>
              <div>
                <span className="font-bold text-4xl">INGREDIENTS NEEDED</span>
                <li>
                  We have a really simple and delicious ingredient list for you.
                </li>
                <ul>
                  {recipe?.extendedIngredients.map((ingre, index) => (
                    <li key={index}>{ingre.name}</li>
                  ))}
                </ul>
                <div className="">
                  <span className="font-semibold text-2xl">
                    HOW TO MAKE {recipe?.title}
                  </span>
                  <p>Let's cook</p>
                  <ul>
                    {[
                      "Preheat oven to 35",
                      "Mix together in a medium bowl the flour, baking soda, and salt.Carefully soften chocolate chips, butter, and vanilla flavoring in the microwave in 15 second increments, stirring in between, for one full minute.Beat eggs and sugar together until light an fluffy.Reduce blender speed and combine the melted chocolate chips, butter, vanilla, and slowly mix in the flour.",
                      "Add in the chocolate chunks and pecans until mixed.Drop 1 tablespoon of dough onto cookie sheet, 2 - 3 inches apart and bake for 12-14 minutes, keeping your center soft and chewy. Allow to cool for 10 minutes before moving to a cooling rack to cool completely.",
                    ].map((ingre, index) => (
                      <li key={index} className="list-disc">
                        {ingre}
                      </li>
                    ))}
                  </ul>
                  Scoop these big flavors into a bowl, get your toppings
                  together and let’s gooooo!
                </div>
                <div >
                   <ul>
                      <li>{recipe?.preparationMinutes}</li>
                      <li>{recipe?.cookingMinutes}</li>
                      <li>{recipe?.readyInMinutes}</li>
                   </ul>
                </div>
                <div className="mt-4">
                  <span className="text-3xl">EQUIPMENTS WE NEEDED</span>
                  <img
                    src={`${
                      import.meta.env.VITE_SPOONACULAR_API
                    }/${recipe?.id}/equipmentWidget.png?apiKey=${
                      import.meta.env.VITE_SPOONACULAR_API_KEY
                    }`}
                    alt="Equipment Needed"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-3xl">INGREEDIENCE WE NEEDED</span>
                  <img
                    src={`${
                      import.meta.env.VITE_SPOONACULAR_API
                    }/${recipe?.id}/ingredientWidget.png?apiKey=${
                      import.meta.env.VITE_SPOONACULAR_API_KEY
                    }`}
                    alt="Equipment Needed"
                  />
                </div>
                <div className="mt-4">
                  <span className="font-bold">NUTRITION FACTS</span>
                  <img
                    src={`${
                      import.meta.env.VITE_SPOONACULAR_API
                    }/${recipe?.id}/nutritionLabel.png?apiKey=${
                      import.meta.env.VITE_SPOONACULAR_API_KEY
                    }`}
                    alt="Equipment Needed"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-25 h-[350px]">
            <img
              src={image}
              alt={"recipe.title"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailes;
