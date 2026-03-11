import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';



export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies?.authToken;

        if (!token) {
            return res.status(401).json({ error: 'Token non fourni' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ error: 'Token invalide ou expiré' });
        }

        req.user = decoded;
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Authentification échouée' });
    }
};

export const optionalAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies?.authToken;

        if (token) {
            const decoded = verifyToken(token);
            if (decoded) {
                req.user = decoded;
                req.userId = decoded.id;
            }
        }

        next();
    } catch (error) {
        console.error('Optional authentication error:', error);
        next();
    }
};
