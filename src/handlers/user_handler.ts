import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UsersClass } from '../models/user';
import config from '../config';

// Done
const tokenizer = config.auth.secret;
const store = new UsersClass();

/**
 * It takes a username and password and email from the request body,
 * authenticates the user, and returns token
 * if the user is authenticated
 */
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
) => {
  const user: User = {
    username: req.body.username as string,
    password: req.body.password as string,
    email: req.body.email as string
  };

  try {
    const u = await store.authenticate(user.username, user.password as string);
    const token = jwt.sign({ user: u }, tokenizer);

    // DONE Here
    res.status(201).json(token);
    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

/**
 * If the request has an authorization header, verify the token and call next() if it's valid
 * @returns A function that takes in a request, response, and next function.
 */
export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* This is getting the authorization header from the request and splitting it into an array. */
    const authorizationHeader = req.headers.authorization;

    const token = authorizationHeader?.split(' ')[1];

    /* Checking if the token is valid. */
    if (token) {
      try {
        jwt.verify(token, config.auth.secret);

        return next();
      } catch (error) {
        return res.status(401).json({
          error: true,
          message: "can't verify JWT token",
          error_message: error
        });
      }
    } else {
      return res
        .status(401)
        .json({ error: true, message: "there's no JWT token" });
    }
  } catch (error) {
    return res.status(401);
  }
};

/**
 * It takes a request and a response, and returns a promise that resolves to void
 */

const createUser = async (req: Request, res: Response) => {
  try {
    const u: User = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    // hash password
    u.password = await bcrypt.hash(
      u.password + config.auth.pepper,
      config.auth.rounds
    );

    const user: User = await store.create(u);

    // deleting literal password
    delete u.password;
    res.status(201).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
  return true;
};

const userRoutes = (app: express.Application) => {
  // Done
  app.post('/register', createUser); // save new user in DB
  app.post('/login', authenticate); // username + password => JWT Token
};

export default userRoutes;
