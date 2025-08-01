const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { password } = req.body;

  if (password === 'Mikael1219') {
    req.session.authenticated = true;
    return res.status(200).json({ exito: true });
  } else {
    return res.status(401).json({ exito: false, message: 'Contraseña incorrecta' });
  }
});

module.exports = router;