import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (role, id) => {
  return jwt.sign(
    { role: role, id: id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};


export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Kein Token, Zugriff verweigert' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.id = decoded.id;
    req.role = decoded.role;
    
    next();
  } catch (error) {
    console.error('Token-Fehler:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token abgelaufen, bitte erneut anmelden' });
    }
    return res.status(401).json({ message: 'Ungültiger Token' });
  };
};