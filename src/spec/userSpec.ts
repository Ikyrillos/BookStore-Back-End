import { UsersClass } from '../models/user';
import { verifyAuthToken } from '../handlers/user_handler';

const userModel = new UsersClass();
const user = {
  username: 'sameh123',
  password: '123456789',
  email: 'sameh@sss.co'
};
describe('Users Model', () => {
  it('should have a create method', () => {
    expect(userModel.create).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(userModel.authenticate).toBeDefined();
  });

  it('create method should add an user', async () => {
    const result = await userModel.create(user);
    const r = result;
    delete r.id;
    expect(result.username).toEqual(r.username);
  });
  describe('Users handler', () => {
    it('verify token method should be defined', async () => {
      expect(verifyAuthToken).toBeDefined();
    });
  });
});
