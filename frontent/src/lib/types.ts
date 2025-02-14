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
export interface IRecipe{
    id:number,
    title:string,
    image:string,
    sourceName:string,
    readyInMinutes:number,
    cookingMinutes:number,
    spoonacularScore:number,
    aggregateLikes:number,
    extendedIngredients:{
        name:string
    },
    summary:string,
    instructions:string,
    analyzedInstructions:{
      strps:{
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