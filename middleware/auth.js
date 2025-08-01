function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  } else {
    return res.status(401).json({ message: 'No autorizado' });
  }
}

module.exports = requireAuth;