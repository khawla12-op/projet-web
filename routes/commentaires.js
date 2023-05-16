const express = require('express');
const router = express.Router();
const Commentaire = require('../models/commentaire');
const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClientconst 

// Récupérer les commentaires en utilisant les paramètres de pagination "take" et "skip"
router.get('/', async (req, res) => {
    try {
      const take = req.query.take ? parseInt(req.query.take) : 10; // default value of take is 10
      const skip = req.query.skip ? parseInt(req.query.skip) : 0; // default value of skip is 0
      
      const commentaires = await Commentaire.find().skip(skip).limit(take);
      res.json(commentaires);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
// Récupérer un commentaire par son ID
router.get('/:id', getCommentaire, (req, res) => {
  res.json(res.commentaire);
});

// Ajouter un commentaire
router.post('/', async (req, res) => {
  const commentaire = new Commentaire({
    email: req.body.email,
    contenu: req.body.contenu
  });

  try {
    const newCommentaire = await commentaire.save();
    res.status(201).json(newCommentaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un commentaire
router.patch('/', getCommentaire, async (req, res) => {
  if (req.body.email != null) {
    res.commentaire.email = req.body.email;
  }
  if (req.body.contenu != null) {
    res.commentaire.contenu = req.body.contenu;
  }

  try {
    const updatedCommentaire = await res.commentaire.save();
    res.json(updatedCommentaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un commentaire
router.delete('/:id', getCommentaire, async (req, res) => {
  try {
    await res.commentaire.remove();
    res.json({ message: 'Commentaire supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour récupérer un commentaire par son ID
async function getCommentaire(req, res, next) {
  try {
    const commentaire = await Commentaire.findById(req.params.id);
    if (commentaire == null) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    res.commentaire = commentaire;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


module.exports = router;
