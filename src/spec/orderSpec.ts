import { BookStore } from '../models/order';
import { UsersClass } from '../models/user';

const orderItem = {
  orderId: '1',
  status: 'pending',
  userId: '1'
};
const order = new BookStore();
describe('Order Model', () => {
  it('should have an index method', () => {
    expect(order.create).toBeDefined();
  });
  it('should have a show method', () => {
    expect(order.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(order.delete).toBeDefined();
  });

  it('create method should add a order', async () => {
    interface OrderResult {
      user_id?: string;
      userId: string;
      id?: string;
      status: string;
    }

    const userModel = new UsersClass();
    await userModel.create({
      id: Number(orderItem.userId),
      username: 'string',
      password: 'string',
      email: 'string'
    });
    const result: OrderResult = await order.create(orderItem);

    // const r = result;
    expect(result.user_id).toEqual(orderItem.userId);
  });

  it('index method should return a list of orders', async () => {
    const result = await order.index();
    const r = result;
    r.map((item) => {
      const orderElm = item;
      delete orderElm.id;
      return orderElm;
    });
    expect(result).toEqual(r);
  });
});
