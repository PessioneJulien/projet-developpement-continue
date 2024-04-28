const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(cors({
  origin: ["*"],
  methods: ['*'],
  allowedHeaders: ["*"],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Connexion à MongoDB
mongoose.connect(process.env.SERVER_MONGO, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  authSource: "admin"
});

// Schéma pour les utilisateurs
const utilisateurschema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    lowercase: true,
    match: [/^.+@.+\..+$/, "Merci de renseigner une adresse email valide"]
  },
  dateNaissance: { type: Date },
  ville: { type: String },
  codePostal: { type: String, maxlength: 5 }
});

const User = mongoose.model('utilisateurs', utilisateurschema);

const authenticate = (req, res, next) => {
  const { password, admin } = req.query;
  if ((process.env.ADMIN_PASS !== password) && !admin) {
    return res.status(401).send({ detail: "Unauthorized" });
  }
  next();
};

app.get('/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await User.find({}).exec();
    console.log(utilisateurs);
    if (!utilisateurs) {
      return res.status(404).send({ detail: "utilisateurs not found" });
    }
    res.send(utilisateurs);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get('/utilisateurs/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).exec();
    if (!user) {
      return res.status(404).send({ detail: "User not found" });
    }
    res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});


app.post('/utilisateurs', async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.delete('/utilisateurs/:user_id', authenticate, async (req, res) => {
  try {
    const result = await User.findByIdAndRemove(req.params.user_id).exec();
    if (!result) {
      return res.status(404).send({ detail: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
