import {Application} from 'express';
import { createCliente, deleteCliente, listClientes, retrieveCliente, updateCliente } from './controllers/player.controller';
import { createCategory, deleteCategory, listCategorys, retrieveCategory, updateCategory } from './controllers/category.controller';

export const router = (app: Application) => {
    app.post("/clients", createCliente);    
    app.get("/clients/:id", retrieveCliente);
    app.put("/clients/:id", updateCliente);
    app.delete("/clients/:id", deleteCliente);    
    app.get("/clients", listClientes);


    app.post("/categorys", createCategory);    
    app.get("/categorys/:id", retrieveCategory);
    app.put("/categorys/:id", updateCategory);
    app.delete("/categorys/:id", deleteCategory);    
    app.get("/categorys", listCategorys);


}