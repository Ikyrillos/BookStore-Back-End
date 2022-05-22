import { Pool } from 'pg';
import Client from '../config/database.config';

export type Order = {
  id?: string;
  status: string;
  userId: string;
};

export class BookStore {
  // eslint-disable-next-line class-methods-use-this
  async index(): Promise<Order[]> {
    try {
      const conn = await (Client as Pool).connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await (Client as Pool).connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async create(b: Order): Promise<Order> {
    try {
      // eslint-disable-next-line operator-linebreak
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const conn = await (Client as Pool).connect();
      const result = await conn.query(sql, [b.status, b.userId]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await (Client as Pool).connect();

      const result = await conn.query(sql, [id]);

      const book = await result.rows[0];

      conn.release();
      return book;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
