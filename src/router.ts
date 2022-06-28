import {Application} from 'express';
import { createComputer, deleteComputer, listComputers, retrieveComputer, updateComputer } from './controllers/computer.controller';
export const router = (app: Application) => {
    app.post("/clients", createComputer);    
    app.get("/clients/:id", retrieveComputer);
    app.put("/clients/:id", updateComputer);
    app.delete("/clients/:id", deleteComputer);    
    app.get("/clients", listComputers);



}