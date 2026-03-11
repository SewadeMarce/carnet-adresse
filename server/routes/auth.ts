import express, { Router, type Request, type Response } from 'express';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { COOKIE_EXPIRY } from '../config/env';

const authRouter: Router = express.Router();

// REGISTER user
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }


    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateToken({
      id: String(savedUser._id),
      email: savedUser.email,
      username: savedUser.username
    });

    // Set cookie with token
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_EXPIRY,
      path: '/'
    });

    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      message: 'Inscription réussie'
    });
  } catch (error: any) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(400).json({ error: error.message });
  }
});

// LOGIN user
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Check password
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Generate JWT token
    const token = generateToken({
      id: String(user._id),
      email: user.email,
      username: user.username
    });

    // Set cookie with token
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_EXPIRY,
      path: '/'
    });

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      message: 'Connexion réussie'
    });
  } catch (error: any) {
    console.error('Erreur lors de la connexion:', error);
    res.status(400).json({ error: error.message });
  }
});

// LOGOUT user
authRouter.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
  res.json({ message: 'Déconnexion réussie' });
});

// GET user profile
authRouter.get('/profile/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default authRouter;
