const express = require('express');
const router = express.Router();
const albumStore = require('../models/albumStore');

// GET all albums
router.get('/', (req, res) => {
  const albums = albumStore.getAll();
  res.json(albums);
});

// GET album by ID
router.get('/:id', (req, res) => {
  const album = albumStore.getById(req.params.id);
  if (!album) {
    return res.status(404).json({ error: 'Album not found' });
  }
  res.json(album);
});

// POST new album
router.post('/', (req, res) => {
  const { title, artist, year, genre } = req.body;
  
  // Basic validation
  if (!title || !artist) {
    return res.status(400).json({ error: 'Title and artist are required' });
  }

  const newAlbum = albumStore.create({ title, artist, year, genre });
  res.status(201).json(newAlbum);
});

// PUT update album
router.put('/:id', (req, res) => {
  const { title, artist, year, genre } = req.body;
  
  // Basic validation
  if (!title || !artist) {
    return res.status(400).json({ error: 'Title and artist are required' });
  }

  const updatedAlbum = albumStore.update(req.params.id, { title, artist, year, genre });
  if (!updatedAlbum) {
    return res.status(404).json({ error: 'Album not found' });
  }
  res.json(updatedAlbum);
});

// DELETE album
router.delete('/:id', (req, res) => {
  const deleted = albumStore.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Album not found' });
  }
  res.status(204).send();
});

module.exports = router;
