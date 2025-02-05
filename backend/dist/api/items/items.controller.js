"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = createItem;
exports.createItems = createItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.getItem = getItem;
exports.getItems = getItems;
const items_service_1 = require("./items.service");
async function createItem(req, res) {
    try {
        const item = await items_service_1.itemsService.createItem(req.body, req.user.id);
        res.status(200).json(item);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
async function createItems(req, res) {
    try {
        const item = await items_service_1.itemsService.createItems(req.body);
        res.status(200).json(item);
    }
    catch (err) {
        res.status(500).send(err);
    }
}
async function updateItem(req, res) {
    try {
        const updated = await items_service_1.itemsService.updateItem(req.body);
        res.status(200).json(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
}
async function deleteItem(req, res) {
    try {
        const deleted = await items_service_1.itemsService.deleteItem(req.body.id);
        res.status(200).json(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
}
async function getItem(req, res) {
    try {
        const item = await items_service_1.itemsService.getItem(req.params.id);
        if (!item) {
            res.status(404).send('Item not found');
        }
        res.status(200).json(item);
    }
    catch (err) {
        res.status(500).send(err);
    }
}
async function getItems(req, res) {
    try {
        const items = await items_service_1.itemsService.getItems(req.user?.id);
        res.status(200).json(items);
    }
    catch (err) {
        res.status(500).send(err);
    }
}
