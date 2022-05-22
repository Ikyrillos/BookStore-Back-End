import express, { Request, Response } from 'express';

import dotenv from 'dotenv';
import { Orders, OrderBook } from '../models/order_book';
import { verifyAuthToken } from './user_handler';

dotenv.config();
const store = new OrderBook();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Orders = {
      quantity: req.body.quantity,
      orderId: req.body.orderId,
      status: req.body.status,
      productId: req.body.productId
    };

    const newOrder = await store.addProduct(
      order.quantity,
      order.orderId,
      order.status,
      order.productId
    );

    res.json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deleted = await store.distroy(Number(id));

    return res.json(deleted);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const UID = req.body.id;
    const getall = await store.index(Number(UID));

    res.json(getall);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const UID = req.body.id;
    const { status } = req.body;
    const showResult = await store.showProcessing(Number(UID), status);

    res.json(showResult);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = {
      orderId: req.body.orderId,
      status: req.body.status,
      userId: req.body.userId
    };
    console.log(order);

    const newOrder = await store.addOrder(
      order.orderId,
      order.status,
      order.userId
    );

    res.status(201).json(newOrder);
    console.log(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  app.post('/orders', verifyAuthToken, addOrder);

  // add product
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default orderRoutes;
