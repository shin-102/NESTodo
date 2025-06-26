import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
const jwtSecret: string = process.env.JWT_SECRET!;

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7); // Remove 'Bearer ' prefix
  }

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err || !decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
      res.status(401).json({ message: 'Invalid token'});
      return;
    }
    req.userId = (decoded as JwtPayload).userId;
    next();
  })
}

export default authMiddleware;