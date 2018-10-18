export class IngredientModel{
    constructor(
        public id: string,
        public ingredientName: string,
        public ingredientValue: string,
        public amount: string,
        public measureName: string,
        public measureValue: string,
    ){}
}