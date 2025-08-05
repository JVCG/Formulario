/*function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  } else {
    return res.status(401).json({ message: 'No autorizado' });
  }
}*/
function requireAuth(req, res, next) {
  console.log('Sesión actual:', req.session); // 👈 Agregado
  if (req.session && req.session.authenticated) {
    return next();
  } else {
    return res.status(401).json({ message: 'No autorizado' });
  }
}


module.exports = requireAuth;