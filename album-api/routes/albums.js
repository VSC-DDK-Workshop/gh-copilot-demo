const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const albumService = require('../services/albumService');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array()
    });
  }
  next();
};

// GET /api/albums - Get all albums with optional filtering
router.get('/', [
  query('search').optional().isString().trim(),
  query('genre').optional().isString().trim(),
  query('artist').optional().isString().trim(),
  handleValidationErrors
], (req, res) => {
  try {
    let albums;

    if (req.query.search) {
      albums = albumService.searchAlbums(req.query.search);
    } else if (req.query.genre) {
      albums = albumService.getAlbumsByGenre(req.query.genre);
    } else if (req.query.artist) {
      albums = albumService.getAlbumsByArtist(req.query.artist);
    } else {
      albums = albumService.getAllAlbums();
    }

    res.json({
      success: true,
      data: albums,
      count: albums.length
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
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
    const album = albumService.getAlbumById(req.params.id);
    
    if (!album) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Album not found'
      });
    }

    res.json({
      success: true,
      data: album
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// POST /api/albums - Create new album
router.post('/', [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('artist').notEmpty().trim().withMessage('Artist is required'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be a valid year'),
  body('genre').notEmpty().trim().withMessage('Genre is required'),
  body('tracks').optional().isArray().withMessage('Tracks must be an array'),
  handleValidationErrors
], (req, res) => {
  try {
    const album = albumService.createAlbum(req.body);
    
    res.status(201).json({
      success: true,
      data: album,
      message: 'Album created successfully'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Bad Request',
      message: error.message
    });
  }
});

// PUT /api/albums/:id - Update album
router.put('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('title').optional().notEmpty().trim().withMessage('Title cannot be empty'),
  body('artist').optional().notEmpty().trim().withMessage('Artist cannot be empty'),
  body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be a valid year'),
  body('genre').optional().notEmpty().trim().withMessage('Genre cannot be empty'),
  body('tracks').optional().isArray().withMessage('Tracks must be an array'),
  handleValidationErrors
], (req, res) => {
  try {
    const album = albumService.updateAlbum(req.params.id, req.body);
    
    if (!album) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Album not found'
      });
    }

    res.json({
      success: true,
      data: album,
      message: 'Album updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Bad Request',
      message: error.message
    });
  }
});

// DELETE /api/albums/:id - Delete album
router.delete('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors
], (req, res) => {
  try {
    const deleted = albumService.deleteAlbum(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Album not found'
      });
    }

    res.json({
      success: true,
      message: 'Album deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

module.exports = router;
