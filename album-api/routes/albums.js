const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const AlbumStore = require('../data/albumStore');

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

// Validation rules for album creation/update
const albumValidationRules = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be between 1-200 characters'),
  body('artist')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Artist is required and must be between 1-200 characters'),
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Year must be a valid year between 1900 and next year'),
  body('genre')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Genre is required and must be between 1-100 characters'),
  body('tracks')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Tracks must be a positive integer (max 100)'),
  body('duration')
    .optional()
    .matches(/^\d{1,3}:\d{2}$/)
    .withMessage('Duration must be in format MM:SS or MMM:SS'),
  body('label')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Label must be less than 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters')
];

// GET /api/albums - Get all albums with optional filtering
router.get('/', [
  query('genre').optional().trim().isLength({ min: 1 }),
  query('year').optional().isInt({ min: 1900 }),
  query('search').optional().trim().isLength({ min: 1 }),
  handleValidationErrors
], (req, res) => {
  try {
    let albums;
    
    if (req.query.search) {
      albums = AlbumStore.search(req.query.search);
    } else if (req.query.genre) {
      albums = AlbumStore.getByGenre(req.query.genre);
    } else if (req.query.year) {
      albums = AlbumStore.getByYear(req.query.year);
    } else {
      albums = AlbumStore.getAll();
    }
    
    res.json({
      success: true,
      count: albums.length,
      data: albums
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve albums',
      message: error.message
    });
  }
});

// GET /api/albums/:id - Get album by ID
router.get('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors
], (req, res) => {
  try {
    const album = AlbumStore.getById(req.params.id);
    
    if (!album) {
      return res.status(404).json({
        error: 'Album not found',
        message: `Album with ID ${req.params.id} does not exist`
      });
    }
    
    res.json({
      success: true,
      data: album
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve album',
      message: error.message
    });
  }
});

// POST /api/albums - Create new album
router.post('/', [
  ...albumValidationRules,
  handleValidationErrors
], (req, res) => {
  try {
    const albumData = {
      title: req.body.title,
      artist: req.body.artist,
      year: parseInt(req.body.year),
      genre: req.body.genre,
      tracks: req.body.tracks ? parseInt(req.body.tracks) : null,
      duration: req.body.duration || null,
      label: req.body.label || null,
      description: req.body.description || null
    };
    
    const newAlbum = AlbumStore.create(albumData);
    
    res.status(201).json({
      success: true,
      message: 'Album created successfully',
      data: newAlbum
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create album',
      message: error.message
    });
  }
});

// PUT /api/albums/:id - Update album by ID
router.put('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  ...albumValidationRules,
  handleValidationErrors
], (req, res) => {
  try {
    const albumData = {
      title: req.body.title,
      artist: req.body.artist,
      year: parseInt(req.body.year),
      genre: req.body.genre,
      tracks: req.body.tracks ? parseInt(req.body.tracks) : null,
      duration: req.body.duration || null,
      label: req.body.label || null,
      description: req.body.description || null
    };
    
    const updatedAlbum = AlbumStore.update(req.params.id, albumData);
    
    if (!updatedAlbum) {
      return res.status(404).json({
        error: 'Album not found',
        message: `Album with ID ${req.params.id} does not exist`
      });
    }
    
    res.json({
      success: true,
      message: 'Album updated successfully',
      data: updatedAlbum
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update album',
      message: error.message
    });
  }
});

// DELETE /api/albums/:id - Delete album by ID
router.delete('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors
], (req, res) => {
  try {
    const deleted = AlbumStore.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        error: 'Album not found',
        message: `Album with ID ${req.params.id} does not exist`
      });
    }
    
    res.json({
      success: true,
      message: `Album with ID ${req.params.id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete album',
      message: error.message
    });
  }
});

module.exports = router;
