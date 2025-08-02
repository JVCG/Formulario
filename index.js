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

/*const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
};*/
const allowedOrigins = ['http://localhost:5173', 'https://jvbusinessconsulting.izipetperu.com']; // <--- coloca aquí tu dominio real

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true
}));
//app.use(cors(corsOptions));
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