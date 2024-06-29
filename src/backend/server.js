const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  usuario: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
  res.send("Bienvenido");
});

// Routes
app.post('/register', async (req, res) => {
  const { usuario, email, password } = req.body;
  const newUser = new User({ usuario, email, password });
  await newUser.save();
  res.status(201).json({ message: 'Registrado' });
});

app.post('/login', async (req, res) => {
  const { usuario, password } = req.body;
  const user = await User.findOne({ usuario, password });
  if (user) {
    res.status(200).json({ message: 'ISession' });
  } else {
    res.status(401).json({ message: 'Usuario o Contraseña incorrectos' });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
