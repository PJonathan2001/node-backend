"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const computer_controller_1 = require("./controllers/computer.controller");
const router = (app) => {
    app.post("/clients", computer_controller_1.createComputer);
    app.get("/clients/:id", computer_controller_1.retrieveComputer);
    app.put("/clients/:id", computer_controller_1.updateComputer);
    app.delete("/clients/:id", computer_controller_1.deleteComputer);
    app.get("/clients", computer_controller_1.listComputers);
};
exports.router = router;
