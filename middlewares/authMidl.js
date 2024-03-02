const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.secretKey;


const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
};

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (token){
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token invalide' });
  
      req.user = user;
      next();
    });
  
  } 

  return res.status(401).json({ message: 'you are not authorized' });

};

module.exports = {
  generateToken,
  authenticateToken,
};