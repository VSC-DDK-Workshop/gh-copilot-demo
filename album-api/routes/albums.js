const express = require('express');
const router = express.Router();
const albumModel = require('../models/album');

// Middleware to validate album data
const validateAlbumData = (req, res, next) => {
  const { title, artist, year, genre, tracks } = req.body;
  
  // For POST requests, title and artist are required
  // For PUT requests, we allow partial updates
  if (req.method === 'POST' && (!title || !artist)) {
    return res.status(400).json({ message: 'Title and artist are required fields for new albums' });
  }
  
  if (year && (isNaN(year) || year < 1900 || year > new Date().getFullYear())) {
    return res.status(400).json({ message: 'Year must be a valid year between 1900 and present' });
  }
  
  if (tracks && (isNaN(tracks) || tracks < 1)) {
    return res.status(400).json({ message: 'Tracks must be a positive number' });
  }
  
  next();
};

// GET /api/albums - Get all albums
router.get('/', (req, res) => {
  const albums = albumModel.getAllAlbums();
  res.json(albums);
});

// GET /api/albums/:id - Get album by ID
router.get('/:id', (req, res) => {
  const album = albumModel.getAlbumById(req.params.id);
  
  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }
  
  res.json(album);
});

// POST /api/albums - Create a new album
router.post('/', validateAlbumData, (req, res) => {
  const newAlbum = albumModel.createAlbum(req.body);
  res.status(201).json(newAlbum);
});

// PUT /api/albums/:id - Update an album
router.put('/:id', validateAlbumData, (req, res) => {
  const updatedAlbum = albumModel.updateAlbum(req.params.id, req.body);
  
  if (!updatedAlbum) {
    return res.status(404).json({ message: 'Album not found' });
  }
  
  res.json(updatedAlbum);
});

// DELETE /api/albums/:id - Delete an album
router.delete('/:id', (req, res) => {
  const deleted = albumModel.deleteAlbum(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ message: 'Album not found' });
  }
  
  res.status(204).end();
});

module.exports = router;
