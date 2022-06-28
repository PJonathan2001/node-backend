import { Schema, model } from 'mongoose';

//Interface
export interface IPlayer {
    nombre:       null | string;
    telefono:      null | string;
    direccion:           string;
    email:            string | null;

} 

//Schema
const playerSchema = new Schema<IPlayer>({
    nombre : {type: String},
    telefono: {type: String},
    direccion: {type: String},
    email: {type: String}
});

//Model
const Player = model<IPlayer>('Player', playerSchema);

export {Player}

