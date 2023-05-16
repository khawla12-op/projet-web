const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Exemple de base de données d'utilisateurs (pour simplifier l'exemple)
const users = [
  {
    id: 1,
    username: 'john',
    password: '$2b$10$Z/9jzLOU3oTQaxI1qzR3.OvPZXxhfdS9QcGGsi3CtLBCekrRLhG1W' // Mot de passe : "password"
  },
  {
    id: 2,
    username: 'jane',
    password: '$2b$10$fRn2IPeUOSdrC0GoP1tI8.7myI53Kr/WNfbiO/snyVnpxzFzV1V6q' // Mot de passe : "pass123"
  }
];

// Route pour l'authentification
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Recherche de l'utilisateur dans la base de données
  const user = users.find(user => user.username === username);

  // Vérification des identifiants
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  // Génération du JWT
  const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '1h' });

  // Envoi du JWT comme réponse
  res.json({ token });
});

// Middleware pour vérifier l'authentification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Vérification du JWT
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Ressource protégée' });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
