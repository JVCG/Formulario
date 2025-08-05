/*function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  } else {
    return res.status(401).json({ message: 'No autorizado' });
  }
}*/
/*function requireAuth(req, res, next) {
  console.log('Sesión actual:', req.session); // 👈 Agregado
  if (req.session && req.session.authenticated) {
    return next();
  } else {
    return res.status(401).json({ message: 'No autorizado' });
  }
}

module.exports = requireAuth;*/

const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = requireAuth;