export class RecipeShortModel{
    constructor(
        public id: number, 
        public name: string,
        public preparationTime: number,
        public servings: number,
        public countIngredients: number, 
        public frontImage: string,
    ){}
}