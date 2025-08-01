const express = require('express');
const cors = require('cors');
const session = require('express-session');
const loginRoutes = require('./routes/login');
const leadsRoutes = require('./routes/leads');

const app = express();
//const PORT = 3001;
const PORT = process.env.PORT || 3001;

/*app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));*/

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
  secret: 'clave_secreta_segura',
  resave: false,
  saveUninitialized: true
}));

app.use('/api/login', loginRoutes);
app.use('/api/leads', leadsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});