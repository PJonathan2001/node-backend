import { Request, Response } from 'express';
import { IPlayer, Player } from '../models/player.model';
import { IResponse } from '../models/response.model';


export const createCliente = async (req: Request, res: Response)=> {           
    const {nombre, telefono, direccion, email}: IPlayer = req.body;
    const response = await new PlayerController().create({ nombre, telefono, direccion, email});         
    return res.status(response.status).json(response);   
}

export const retrieveCliente = async (req: Request, res: Response) => {
   const docId : String = req.params.id; 
   const response = await new PlayerController().retrieve(docId);         
   return res.status(response.status).json(response);   
}

export const updateCliente = async (req: Request, res: Response)=> {           
    const { nombre, telefono, direccion, email } : IPlayer = req.body;
    const docId : String = req.params.id; 
    const response = await new PlayerController().update(docId, { nombre, telefono, direccion, email });         
    return res.status(response.status).json(response);   
}

export const deleteCliente = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new PlayerController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listClientes = async (req: Request, res: Response) => {
    const response = await new PlayerController().list();         
    return res.status(200).json(response);    
}




class PlayerController {

    public async create(payload : IPlayer) : Promise<IResponse> {
        const player = new Player(payload);
        return player.save().then(data => {
            return {
                message: "CREATED: Player added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Player",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Player.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Player not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Player retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.direccion ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, payload : IPlayer) : Promise<IResponse>{
        return Player.updateOne({_id: docId} , { $set: { 
            nombre: payload.nombre, 
            telefono: payload.telefono, 
            direccion: payload.direccion, 
            email: payload.email
          } }).then(data => {            
            return {
                message: "OK: Player updated",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Player not updated",
                status: 500,
                content : err
            }
        });
    }
    



    public async delete(docId: String) : Promise<IResponse> {
        return Player.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Player not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Player deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.direccion,
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse> {
        return Player.find({}).then(data => {
                return {
                    message: "OK: All players retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Players", status: 500, content : err }
        });       
    }

}