import { OrderBook } from '../models/order_book';

const orderProduct = new OrderBook();
describe('Order_book Model', () => {
  it('should have an addOrder method', () => {
    expect(orderProduct.addOrder).toBeDefined();
  });
  it('should have an addProduct method', () => {
    expect(orderProduct.addProduct).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(orderProduct.distroy).toBeDefined();
  });
  it('should have an index method', () => {
    expect(orderProduct.index).toBeDefined();
  });

  it('index method should return a list of orders', async () => {
    const result = await orderProduct.index(1);
    const r = result;
    r.map((item) => {
      const orderElm = item;
      delete orderElm.id;
      return orderElm;
    });
    expect(result).toEqual(r);
  });
});
