// routes/pet.js
const express = require('express');
const Pet = require('../models/Pet');

const router = express.Router();

// simple auth guard – relies on authMiddleware setting req.user
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// Customer: get own pets
router.get('/', requireAuth, async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user._id });
    res.json(pets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Customer: create pet
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, species, breed, age } = req.body;

    const pet = await Pet.create({
      owner: req.user._id,
      name,
      species,
      breed,
      age,
    });

    res.json(pet);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin: all pets
router.get('/admin', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ error: 'Forbidden' });

    const pets = await Pet.find().populate('owner', 'name email');
    res.json(pets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
