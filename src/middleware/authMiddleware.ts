import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth/token-verify';

interface CustomRequest extends Request {
  user?: any; // Si prefieres, especifica un tipo más específico
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
