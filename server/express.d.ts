import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
        userId?: string;
    user?: {
        id: string;
        email: string;
        username: string;
        // Ajoutez ici les autres champs présents dans votre payload JWT
      };
    }
  }
}


