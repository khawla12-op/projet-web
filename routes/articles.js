const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Récupérer tous les articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer un article par ID
router.get('/:id', getArticle, (req, res) => {
  res.json(res.article);
});

// Créer un nouvel article
router.post('/', async (req, res) => {
  const article = new Article({
    titre: req.body.titre,
    contenu: req.body.contenu,
    image: req.body.image,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    published: req.body.published
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un article
router.patch('/:id', getArticle, async (req, res) => {
  if (req.body.titre != null) {
    res.article.titre = req.body.titre;
  }
  if (req.body.contenu != null) {
    res.article.contenu = req.body.contenu;
  }
  if (req.body.image != null) {
    res.article.image = req.body.image;
  }
  if (req.body.createdAt != null) {
    res.article.createdAt = req.body.createdAt;
  }
  if (req.body.updatedAt != null) {
    res.article.updatedAt = req.body.updatedAt;
  }
  if (req.body.published != null) {
    res.article.published = req.body.published;
  }

  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un article
router.delete('/:id', getArticle, async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour récupérer un article par ID
async function getArticle(req, res, next) {
  try {
    const article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.article = article;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
