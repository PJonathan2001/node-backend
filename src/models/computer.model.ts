import { Schema, model } from 'mongoose';

//Interface
export interface IComputer {
    procesador:      null | string;
    pantalla:           null | string;
    ram:             null | string;
    rom:                null | string;
    anio_lanzamiento:     null | Date;

} 

//Schema
const computerSchema = new Schema<IComputer>({
    procesador : {type: String},
    pantalla : {type: String},
    ram : {type: String},
    rom : {type: String},
    anio_lanzamiento : {type: Date}
});

//Model
const Computer = model<IComputer>('Player', computerSchema);

export {Computer}

