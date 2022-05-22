/* eslint-disable object-curly-newline */
import express, { Request, Response, Application, json } from 'express';
import cors from 'cors';
import config from './config';
import orderRoutes from './handlers/order_handler';
import userRoutes from './handlers/user_handler';
import bookStoreRoutes from './handlers/books';

const app: Application = express();
const { port } = config.app;

app.use(json());
app.use(cors());

userRoutes(app);
bookStoreRoutes(app);
orderRoutes(app);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('StoreFront Backend');
});
app.listen(port, () => {
  console.log(`Server running in port http://localhost:${port}/`);
});

export default app;
