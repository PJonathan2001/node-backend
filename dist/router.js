"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const player_controller_1 = require("./controllers/player.controller");
const category_controller_1 = require("./controllers/category.controller");
const router = (app) => {
    app.post("/clients", player_controller_1.createCliente);
    app.get("/clients/:id", player_controller_1.retrieveCliente);
    app.put("/clients/:id", player_controller_1.updateCliente);
    app.delete("/clients/:id", player_controller_1.deleteCliente);
    app.get("/clients", player_controller_1.listClientes);
    app.post("/categorys", category_controller_1.createCategory);
    app.get("/categorys/:id", category_controller_1.retrieveCategory);
    app.put("/categorys/:id", category_controller_1.updateCategory);
    app.delete("/categorys/:id", category_controller_1.deleteCategory);
    app.get("/categorys", category_controller_1.listCategorys);
};
exports.router = router;
