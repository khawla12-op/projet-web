const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware pour récupérer un article par ID
async function getArticle(req, res, next) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (article == null) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.article = article;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

router.get('/', async (req, res) => {
  try {
    const take = parseInt(req.query.take) || 10; // Nombre d'articles à récupérer (par défaut 10)
    const skip = parseInt(req.query.skip) || 0; // Position à partir de laquelle récupérer les articles (par défaut 0)
    const articles = await prisma.article.findMany({
      skip,
      take,
    });
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
  const { titre, contenu, image, createdAt, updatedAt, published } = req.body;

  try {
    const newArticle = await prisma.article.create({
      data: {
        titre,
        contenu,
        image,
        createdAt,
        updatedAt,
        published,
      },
    });
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un article
router.patch('/:id', getArticle, async (req, res) => {
  const { titre, contenu, image, createdAt, updatedAt, published } = req.body;
  const updatedData = {};

  if (titre != null) {
    updatedData.titre = titre;
  }
  if (contenu != null) {
    updatedData.contenu = contenu;
  }
  if (image != null) {
    updatedData.image = image;
  }
  if (createdAt != null) {
    updatedData.createdAt = createdAt;
  }
  if (updatedAt != null) {
    updatedData.updatedAt = updatedAt;
  }
  if (published != null) {
    updatedData.published = published;
  }

  try {
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(req.params.id) },
      data: updatedData,
    });
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un article
router.delete('/:id', getArticle, async (req, res) => {
  try {
    await prisma.article.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

