/*const express = require('express');
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

module.exports = router;*/

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Contraseña incorrecta' });
  }
});

module.exports = router;