/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */
import { Pool } from 'pg';
import Client from '../config/database.config';

export type Orders = {
  id?: number;
  quantity: number;
  orderId: string;
  status: string;
  productId: string;
};

export class OrderBook {
  // gathering all from database orders using user's id
  // UID stands for user id.
  async index(UID: number): Promise<Orders[]> {
    try {
      const conn = await (Client as Pool).connect();
      const sql =
        'SELECT * FROM order_books INNER JOIN orders ON orders.user_id=$1';
      const result = await conn.query(sql, [UID]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to complete gathering transaction : ${err}`);
    }
  }

  async showProcessing(UID: number, status: string): Promise<Orders[]> {
    // gathering all from database orders using user's id
    // and returning only active or deactive orders
    try {
      const conn = await (Client as Pool).connect();
      const sql = `SELECT * FROM order_books WHERE user_id = ${UID} AND status = ${status}`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to complete 'Show' transaction : ${err}`);
    }
  }

  // adding product to table order_books
  async addProduct(
    quantity: number,
    orderId: string,
    status: string,
    productId: string
  ): Promise<Orders> {
    try {
      const sql =
        'INSERT INTO order_books (quantity, order_id,status, product_id) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await (Client as Pool).connect();

      const result = await conn.query(sql, [
        quantity,
        orderId,
        status,
        productId
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to 'Add' product ${productId} to the following order ${orderId}: ${err}`
      );
    }
  }

  async addOrder(
    orderId: string,
    status: string,
    userId: string
  ): Promise<Orders> {
    try {
      const sql =
        ' INSERT INTO orders(id, status, user_id) VALUES ($1, $2, $3) RETURNING *';
      const conn = await (Client as Pool).connect();

      const result = await conn.query(sql, [orderId, status, userId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to 'Add' order ${orderId} to the following user ${userId}: ${err}`
      );
    }
  }

  // deleting product from table order_books
  async distroy(id: number): Promise<Orders> {
    try {
      const sql = 'DELETE FROM order_books WHERE id=$1 RETURNING *';
      const conn = await (Client as Pool).connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to complete 'Show' transaction : ${err}`);
    }
  }
}
