import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Cambia 'any' a un tipo más específico si lo prefieres
    }
  }
}
