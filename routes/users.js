const express = require('express');
const router = express.Router();
//const User = require('../models/user');

// Récupérer tous les users avec pagination
router.get('/', async (req, res) => {
  const take = parseInt(req.query.take) || 10; // nombre d'éléments à récupérer
  const skip = parseInt(req.query.skip) || 0; // offset
  try {
    const users = await User.find().skip(skip).limit(take);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*Récupérer un user par id
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});
*/
// Ajouter un user
router.post('/', async (req, res) => {
  const user = new User({
    nom: req.body.nom,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un user par id
router.patch('/', getUser, async (req, res) => {
  if (req.body.nom != null) {
    res.user.nom = req.body.nom;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.role != null) {
    res.user.role = req.body.role;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un user par id
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User introuvable' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}


module.exports = router;
