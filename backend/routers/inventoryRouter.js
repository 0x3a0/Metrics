import express from 'express';

import * as inventoryController from '../controllers/inventoryController.js'


const inventoryRouter = express.Router();

inventoryRouter
    .route('/')
    .get(inventoryController.inventoryInfo)

export default inventoryRouter;