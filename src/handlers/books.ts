import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { BookProduct, Product } from '../models/book_product';
import { verifyAuthToken } from './user_handler';

dotenv.config();
const store = new BookProduct();

const index = async (_req: Request, res: Response) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (_req: Request, res: Response) => {
  const book = await store.show(_req.params.id as string);
  res.json(book);
};

const create = async (req: Request, res: Response) => {
  try {
    const newbook: Product = {
      id: req.body.id as string,
      name: req.body.name as string,
      price: req.body.price as string
    };

    const newBook = await store.create(newbook);

    return res.status(201).json(newBook);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = store.show(req.params.id as string);
    await store.delete(req.params.id as string);
    res.json(deleted);
  } catch (e) {
    res.status(400);
    res.json({ e });
  }
};

const bookStoreRoutes = (app: express.Application) => {
  app.get('/bookshelf', index);
  app.get('/bookshelf/:id', show);
  app.post('/bookshelf', verifyAuthToken, create);
  app.delete('/bookshelf/:id', verifyAuthToken, destroy);
};

export default bookStoreRoutes;
