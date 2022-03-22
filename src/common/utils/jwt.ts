import * as jwt from 'jsonwebtoken';

export const verifyToken = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        err.status(401);
        reject(err);
      } else {
        resolve(decode);
      }
    });
  });

export const generateToken = (email: string) => {
  return jwt.sign({ user: email }, 'secret', {
    expiresIn: '8h',
  });
};
