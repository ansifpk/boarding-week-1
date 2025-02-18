export interface IUser{
    _id:string,
    name:string,
    email:string
}

export interface ICuisine{
    id:number,
    title:string,
    image:string,
    spoonacularScore:number,
    aggregateLikes:number,
}
export interface IWishlist{
    
    userId:string,
    recipes:number[],
    createdAt:string
    
}
export interface IRecipe{
    id:number,
    title:string,
    imageType:string,
    image:string,
    sourceName:string,
    readyInMinutes:number,
    cookingMinutes:number,
    preparationMinutes:number,
    spoonacularScore:number,
    aggregateLikes:number,
    extendedIngredients:{
        name:string
    }[],
    summary:string,
    instructions:string,
    analyzedInstructions:{
      steps:{
        number:number,
        step:string,
        ingredients:{
            name:string,
            image:string
        }[],
        equipment:{
            name:string,
            image:string
        }[]
      }[]
    }[]
}