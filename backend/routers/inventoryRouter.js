import express from 'express';

import * as inventoryController from '../controllers/inventoryController.js'


const inventoryRouter = express.Router();

inventoryRouter.get("/history", inventoryController.historyInventory);
inventoryRouter.get("/realTime", inventoryController.realTimeInventory);

export default inventoryRouter;