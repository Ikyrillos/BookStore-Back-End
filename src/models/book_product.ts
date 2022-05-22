import { Pool } from 'pg';
import Client from '../config/database.config';

export type Product = {
  id?: string;
  name: string;
  price: string;
};

export class BookProduct {
  // eslint-disable-next-line class-methods-use-this
  async index(): Promise<Product[]> {
    try {
      const conn = await (Client as Pool).connect();
      const sql = 'SELECT * FROM book_product';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM book_product WHERE id=($1)';
      const conn = await (Client as Pool).connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${id}. Error: ${err}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async create(b: Product): Promise<Product> {
    try {
      // eslint-disable-next-line operator-linebreak
      const sql =
        'INSERT INTO book_product (id, name, price) VALUES($1, $2, $3) RETURNING *';
      const conn = await (Client as Pool).connect();
      const result = await conn.query(sql, [b.id, b.name, b.price]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not create book_product ${b.id}. Error: ${err}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM book_product WHERE id=($1)';
      const conn = await (Client as Pool).connect();

      const result = await conn.query(sql, [id]);

      const book = await result.rows[0];

      conn.release();
      return book;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
