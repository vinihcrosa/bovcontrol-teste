import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface IPayload {
  id: string;
  farmerName: string;
  farmName: string;
  distanceToFactory: number;
}

async function sign (payload: IPayload) {
  console.log(payload)
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  })
}

async function verify (token: string): Promise<IPayload> {
  return jwt.verify(token, process.env.JWT_SECRET as string) as IPayload;
}

async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const payload = await verify(token);
    req.body.payload = payload;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

export {
  sign,
  verify,
  auth,
}