import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DB_TEST_NAME,
  ENV
} = process.env;
// eslint-disable-next-line import/no-mutable-exports
let Client: unknown;

if (ENV === 'test') {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: DB_TEST_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}

if (ENV === 'dev') {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}

export default Client;
