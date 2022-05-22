import dotenv from 'dotenv';

dotenv.config();

const authConfig = {
  rounds: Number(process.env.SALT_ROUNDS),
  pepper: process.env.BCRYPT_PEPPER as string,
  // DONE
  secret: process.env.TOKEN_SECRET as string,
  expiretime: process.env.EXPIRATION as string
};

export default authConfig;
