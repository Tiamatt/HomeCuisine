import { IngredientModel } from './ingredient.model';
export class RecipeModel{
    constructor(
        public name: string,
        public frontImage: string,
        public ingredients: IngredientModel[], // Note, 'checked' is a reserved word in C#
        public id?: number, 
    ){}
}