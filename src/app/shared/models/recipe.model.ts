import { DirectionModel } from './direction.model';
import { IngredientModel } from './ingredient.model';
export class RecipeModel{
    constructor(
        public name: string,
        public frontImage: string,
        public ingredients: IngredientModel[], // Note, 'checked' is a reserved word in C#
        public directions: DirectionModel[],
        public preparationTime: number,
        public servings: number,
        public id?: number, 
    ){}
}