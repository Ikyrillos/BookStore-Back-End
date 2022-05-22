import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
describe('Networking Tests:', (): void => {
  describe('Endpoint tests:', (): void => {
    it('gets the api endpoint', (done): void => {
      request.get('/').then((response): void => {
        expect(response.status).toBe(200);
        done();
      });
    });
    it('gets the books endpoint', (done): void => {
      request.get('/bookshelf').then((response): void => {
        expect(response.status).toBe(200);
        done();
      });
    });
  });
});
