"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listClientes = exports.deleteCliente = exports.updateCliente = exports.retrieveCliente = exports.createCliente = void 0;
const player_model_1 = require("../models/player.model");
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, telefono, direccion, email } = req.body;
    const response = yield new PlayerController().create({ nombre, telefono, direccion, email });
    return res.status(response.status).json(response);
});
exports.createCliente = createCliente;
const retrieveCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new PlayerController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveCliente = retrieveCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, telefono, direccion, email } = req.body;
    const docId = req.params.id;
    const response = yield new PlayerController().update(docId, { nombre, telefono, direccion, email });
    return res.status(response.status).json(response);
});
exports.updateCliente = updateCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new PlayerController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteCliente = deleteCliente;
const listClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new PlayerController().list();
    return res.status(200).json(response);
});
exports.listClientes = listClientes;
class PlayerController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = new player_model_1.Player(payload);
            return player.save().then(data => {
                return {
                    message: "CREATED: Player added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Player",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return player_model_1.Player.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Player not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Player retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.direccion,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return player_model_1.Player.updateOne({ _id: docId }, { $set: {
                    nombre: payload.nombre,
                    telefono: payload.telefono,
                    direccion: payload.direccion,
                    email: payload.email
                } }).then(data => {
                return {
                    message: "OK: Player updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Player not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return player_model_1.Player.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Player not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Player deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.direccion,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return player_model_1.Player.find({}).then(data => {
                return {
                    message: "OK: All players retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Players", status: 500, content: err };
            });
        });
    }
}
