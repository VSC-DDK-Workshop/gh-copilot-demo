const express = require('express');
const router = express.Router();
const { validateAlbum, validateAlbumUpdate } = require('../middleware/validation');
const albumService = require('../services/albumService');

/**
 * @route GET /api/albums
 * @desc Get all albums with optional filtering and pagination
 * @access Public
 */
router.get('/', (req, res, next) => {
  try {
    const { artist, genre, year, page = 1, limit = 10 } = req.query;
    
    const filters = {};
    if (artist) filters.artist = artist;
    if (genre) filters.genre = genre;
    if (year) filters.year = parseInt(year);
    
    const pagination = {
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const result = albumService.getAllAlbums(filters, pagination);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/albums/:id
 * @desc Get a single album by ID
 * @access Public
 */
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const album = albumService.getAlbumById(id);
    
    if (!album) {
      return res.status(404).json({
        error: 'Album not found',
        message: `No album found with ID: ${id}`
      });
    }
    
    res.json(album);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/albums
 * @desc Create a new album
 * @access Public
 */
router.post('/', validateAlbum, (req, res, next) => {
  try {
    const albumData = req.body;
    const newAlbum = albumService.createAlbum(albumData);
    
    res.status(201).json({
      message: 'Album created successfully',
      album: newAlbum
    });
  } catch (error) {
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        error: 'Conflict',
        message: error.message
      });
    }
    next(error);
  }
});

/**
 * @route PUT /api/albums/:id
 * @desc Update an album by ID
 * @access Public
 */
router.put('/:id', validateAlbumUpdate, (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedAlbum = albumService.updateAlbum(id, updateData);
    
    if (!updatedAlbum) {
      return res.status(404).json({
        error: 'Album not found',
        message: `No album found with ID: ${id}`
      });
    }
    
    res.json({
      message: 'Album updated successfully',
      album: updatedAlbum
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/albums/:id
 * @desc Delete an album by ID
 * @access Public
 */
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = albumService.deleteAlbum(id);
    
    if (!deleted) {
      return res.status(404).json({
        error: 'Album not found',
        message: `No album found with ID: ${id}`
      });
    }
    
    res.json({
      message: 'Album deleted successfully',
      deletedId: id
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/albums/search/:query
 * @desc Search albums by title or artist
 * @access Public
 */
router.get('/search/:query', (req, res, next) => {
  try {
    const { query } = req.params;
    const results = albumService.searchAlbums(query);
    
    res.json({
      query: query,
      count: results.length,
      albums: results
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
