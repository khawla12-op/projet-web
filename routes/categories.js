const express = require('express');
const router = express.Router();
const Categorie = require('../models/categorie');

// GET /categories - Récupère take catégories à partir de la position skip
router.get('/', async (req, res) => {
  const take = req.query.take || 10;
  const skip = req.query.skip || 0;
  const categories = await Categorie.find().skip(skip).limit(take);
  res.json(categories);
});

// GET /categories/:id - Récupère la catégorie ayant l'id donné
router.get('/:id', async (req, res) => {
  const categorie = await Categorie.findById(req.params.id);
  if (!categorie) {
    res.status(404).json({ message: 'Catégorie non trouvée' });
  } else {
    res.json(categorie);
  }
});

// POST /categories - Ajoute une nouvelle catégorie envoyée sous format JSON
router.post('/', async (req, res) => {
  const categorie = new Categorie({
    nom: req.body.nom,
  });
  try {
    const newCategorie = await categorie.save();
    res.status(201).json(newCategorie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /categories/:id - Met à jour la catégorie ayant l'id donné avec les données envoyées dans le corps de la requête
router.patch('/:id', async (req, res) => {
  const categorie = await Categorie.findById(req.params.id);
  if (!categorie) {
    res.status(404).json({ message: 'Catégorie non trouvée' });
  } else {
    categorie.nom = req.body.nom || categorie.nom;
    try {
      const updatedCategorie = await categorie.save();
      res.json(updatedCategorie);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

// DELETE /categories/:id - Supprime la catégorie ayant l'id donné
router.delete('/:id', async (req, res) => {
  const categorie = await Categorie.findById(req.params.id);
  if (!categorie) {
    res.status(404).json({ message: 'Catégorie non trouvée' });
  } else {
    try {
      await categorie.remove();
      res.json({ message: 'Catégorie supprimée' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
