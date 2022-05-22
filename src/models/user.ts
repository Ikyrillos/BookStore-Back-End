/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import Client from '../config/database.config';

dotenv.config();
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
const pepper = BCRYPT_PASSWORD as string;
const saltRounds = SALT_ROUNDS as string;
export interface User {
  id?: number;
  username: string;
  password?: string;
  email: string;
}

export class UsersClass {
  async create(u: User): Promise<User> {
    try {
      const conn = await (Client as Pool).connect();

      // eslint-disable-next-line operator-linebreak
      const sql =
        'INSERT INTO users (username, password_digest, email) VALUES($1, $2, $3) RETURNING *';
      // eslint-disable-next-line radix
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [u.username, hash, u.email]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      throw new Error(`Failed to create (${u.username}): ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await (Client as Pool).connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';
    const result = await conn.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
}
