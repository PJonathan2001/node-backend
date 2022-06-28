import { Schema, model } from 'mongoose';

//Interface
export interface ICategory {
    nombreCategoria:       null | string;

} 

//Schema
const categorySchema = new Schema<ICategory>({
    nombreCategoria : {type: String}
});

//Model
const Category = model<ICategory>('Category', categorySchema);

export {Category}

