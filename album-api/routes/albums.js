const express = require('express');
const { body, param, validationResult } = require('express-validator');
const albumsData = require('../data/albums');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  next();
};

// Album validation rules
const albumValidation = [
  body('title').isLength({ min: 1 }).withMessage('Title is required'),
  body('artist').isLength({ min: 1 }).withMessage('Artist is required'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be a valid year'),
  body('genre').optional().isLength({ min: 1 }).withMessage('Genre cannot be empty if provided'),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer')
];

const idValidation = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')
];

// GET /api/albums - Get all albums
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: albumsData.getAllAlbums(),
      count: albumsData.getAllAlbums().length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve albums' });
  }
});

// GET /api/albums/:id - Get album by ID
router.get('/:id', idValidation, handleValidationErrors, (req, res) => {
  try {
    const album = albumsData.getAlbumById(parseInt(req.params.id));
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json({ success: true, data: album });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve album' });
  }
});

// POST /api/albums - Create new album
router.post('/', albumValidation, handleValidationErrors, (req, res) => {
  try {
    const newAlbum = albumsData.createAlbum(req.body);
    res.status(201).json({ 
      success: true, 
      data: newAlbum,
      message: 'Album created successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create album' });
  }
});

// PUT /api/albums/:id - Update album
router.put('/:id', [...idValidation, ...albumValidation], handleValidationErrors, (req, res) => {
  try {
    const updatedAlbum = albumsData.updateAlbum(parseInt(req.params.id), req.body);
    if (!updatedAlbum) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json({ 
      success: true, 
      data: updatedAlbum,
      message: 'Album updated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update album' });
  }
});

// DELETE /api/albums/:id - Delete album
router.delete('/:id', idValidation, handleValidationErrors, (req, res) => {
  try {
    const deleted = albumsData.deleteAlbum(parseInt(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json({ 
      success: true, 
      message: 'Album deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete album' });
  }
});

module.exports = router;
