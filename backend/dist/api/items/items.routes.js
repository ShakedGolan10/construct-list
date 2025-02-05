"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_controller_1 = require("./items.controller");
const router = express_1.default.Router();
router.post('/single', items_controller_1.createItem);
router.post('/', items_controller_1.createItems);
router.put('/', items_controller_1.updateItem);
router.delete('/', items_controller_1.deleteItem);
router.get('/:id', items_controller_1.getItem);
router.get('/', items_controller_1.getItems);
exports.default = router;
