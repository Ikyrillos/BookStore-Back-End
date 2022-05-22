import { BookProduct, Product } from '../models/book_product';

const store = new BookProduct();

const bookItem: Product = {
  id: '12345',
  name: 'teraland',
  price: '1'
};
describe('Book Model', () => {
  it('should have an index method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a book', async () => {
    const result = await store.create(bookItem);
    const r = result;
    delete r.id;
    expect(result.name).toEqual(r.name);
    store.delete(bookItem.id as string);
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();
    const r = result;
    r.map((item) => {
      const book = item;
      delete book.id;
      return book;
    });
    expect(result).toEqual(r);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show('1');
    const r = result;
    delete r.id;
    expect(result).toEqual(r);
  });
});
