import { Request, Response } from 'express';
import { ICategory, Category } from '../models/categoria.model';
import { IResponse } from '../models/response.model';


export const createCategory = async (req: Request, res: Response)=> {           
    const {nombreCategoria}: ICategory = req.body;
    const response = await new CategoryController().create({ nombreCategoria});         
    return res.status(response.status).json(response);   
}

export const retrieveCategory = async (req: Request, res: Response) => {
   const docId : String = req.params.id; 
   const response = await new CategoryController().retrieve(docId);         
   return res.status(response.status).json(response);   
}

export const updateCategory = async (req: Request, res: Response)=> {           
    const { nombreCategoria } : ICategory = req.body;
    const docId : String = req.params.id; 
    const response = await new CategoryController().update(docId, { nombreCategoria });         
    return res.status(response.status).json(response);   
}

export const deleteCategory = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new CategoryController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listCategorys = async (req: Request, res: Response) => {
    const response = await new CategoryController().list();         
    return res.status(200).json(response);    
}




class CategoryController {

    public async create(payload : ICategory) : Promise<IResponse> {
        const category = new Category(payload);
        return category.save().then(data => {
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
        return Category.findOne({_id: docId}).then(data => {
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

    public async update(docId: String, payload : ICategory) : Promise<IResponse>{
        return Category.updateOne({_id: docId} , { $set: { 
            nombreCategoria: payload.nombreCategoria 
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
        return Category.deleteOne({_id: docId}).then(data => {
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
        return Category.find({}).then(data => {
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