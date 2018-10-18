export class FilterModel{
    constructor(
        public name: string,
        public value: string,
        public selected?: boolean, // Note, 'checked' is a reserved word in C# 
    ){}
}