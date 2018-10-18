export class IngredientModel{
    constructor(
        public ingredientName: string,
        public ingredientValue: string,
        public amount: string,
        public measureName: string,
        public measureAmount: string,
    ){}
}