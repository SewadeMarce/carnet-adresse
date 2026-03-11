# Configuration de l'Authentification avec Token JWT dans les Cookies

## Vue d'ensemble
Ce projet utilise JWT (JSON Web Tokens) stockés dans des cookies HTTP-only pour l'authentification sécurisée.

## Architecture

### Côté Serveur
- **File**: [server/routes/auth.ts](server/routes/auth.ts)
  - `/api/auth/register` - Inscription avec génération du token
  - `/api/auth/login` - Connexion avec génération du token
  - `/api/auth/logout` - Déconnexion et suppression du cookie

- **File**: [server/utils/jwt.ts](server/utils/jwt.ts)
  - `generateToken()` - Génère un JWT
  - `verifyToken()` - Vérifie et décode un JWT
  - `decodeToken()` - Décode un JWT sans vérification

- **File**: [server/middleware/auth.ts](server/middleware/auth.ts)
  - `authMiddleware` - Middleware pour protéger les routes
  - `optionalAuthMiddleware` - Middleware optionnel

- **File**: [server/config/env.ts](server/config/env.ts)
  - Configuration JWT_SECRET et expiration

### Côté Client
- **File**: [app/lib/auth.tsx](app/lib/auth.tsx)
  - Context React pour l'authentification
  - Utilise `credentials: 'include'` dans les fetch

## Configuration

### Variables d'environnement
```env
JWT_SECRET=votre-secret-key-ici
NODE_ENV=development  # ou 'production'
```

### Configuration des Cookies
- **httpOnly**: true (protection XSS)
- **secure**: true en production (HTTPS uniquement)
- **sameSite**: 'strict' (protection CSRF)
- **maxAge**: 7 jours
- **path**: '/'

## Utilisation

### Login
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important pour envoyer les cookies
  body: JSON.stringify({ email, password }),
});
```

### Protéger une route
```typescript
import { authMiddleware } from '../middleware/auth';

router.get('/protected', authMiddleware, (req, res) => {
  // req.user contient les données du token
  res.json({ user: req.user });
});
```

### Logout
```typescript
const response = await fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include',
});
```

## Sécurité

✅ **Implémenté**:
- Tokens JWT signés avec secret
- Cookies HTTP-only (pas accessible via JavaScript)
- Protection CSRF avec sameSite strict
- Expiration automatique des tokens (7 jours)
- Hashage des mots de passe avec bcryptjs

⚠️ **À considérer**:
- Utiliser HTTPS en production
- Changer JWT_SECRET en production
- Implémenter un mécanisme de refresh token
- Ajouter une liste noire de tokens révoqués

## Gestion des cookies en développement

En développement local, assurez-vous que:
- Frontend et backend utilisent le même domaine (localhost)
- Le flag `secure` est false en développement
- CORS est correctement configuré avec `credentials: 'include'`
