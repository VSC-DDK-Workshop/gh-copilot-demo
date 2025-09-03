const express = require('express');
const router = express.Router();
const albumData = require('../data/albums');
const { 
  albumValidationRules, 
  queryValidationRules, 
  validate, 
  validateId 
} = require('../middleware/validation');

// GET /api/albums - Get all albums with optional filtering
router.get('/', queryValidationRules(), validate, (req, res) => {
  try {
    const filters = {
      artist: req.query.artist,
      genre: req.query.genre,
      year: req.query.year,
      minRating: req.query.minRating
    };
    
    const albums = albumData.getAll(filters);
    
    res.json({
      success: true,
      count: albums.length,
      data: albums,
      filters: Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined)
      )
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve albums'
    });
  }
});

// GET /api/albums/stats - Get album statistics
router.get('/stats', (req, res) => {
  try {
    const stats = albumData.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve statistics'
    });
  }
});

// GET /api/albums/:id - Get specific album by ID
router.get('/:id', validateId, (req, res) => {
  try {
    const album = albumData.getById(req.params.id);
    
    if (!album) {
      return res.status(404).json({
        error: 'Not found',
        message: `Album with ID ${req.params.id} not found`
      });
    }
    
    res.json({
      success: true,
      data: album
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve album'
    });
  }
});

// POST /api/albums - Create new album
router.post('/', albumValidationRules(), validate, (req, res) => {
  try {
    const albumData_input = {
      title: req.body.title,
      artist: req.body.artist,
      year: parseInt(req.body.year),
      genre: req.body.genre,
      tracks: req.body.tracks || [],
      coverUrl: req.body.coverUrl || '',
      rating: req.body.rating || 3
    };
    
    const newAlbum = albumData.create(albumData_input);
    
    res.status(201).json({
      success: true,
      message: 'Album created successfully',
      data: newAlbum
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create album'
    });
  }
});

// PUT /api/albums/:id - Update existing album
router.put('/:id', validateId, albumValidationRules(), validate, (req, res) => {
  try {
    const albumExists = albumData.getById(req.params.id);
    
    if (!albumExists) {
      return res.status(404).json({
        error: 'Not found',
        message: `Album with ID ${req.params.id} not found`
      });
    }
    
    const albumData_input = {
      title: req.body.title,
      artist: req.body.artist,
      year: parseInt(req.body.year),
      genre: req.body.genre,
      tracks: req.body.tracks || albumExists.tracks,
      coverUrl: req.body.coverUrl !== undefined ? req.body.coverUrl : albumExists.coverUrl,
      rating: req.body.rating !== undefined ? req.body.rating : albumExists.rating
    };
    
    const updatedAlbum = albumData.update(req.params.id, albumData_input);
    
    res.json({
      success: true,
      message: 'Album updated successfully',
      data: updatedAlbum
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update album'
    });
  }
});

// PATCH /api/albums/:id - Partially update existing album
router.patch('/:id', validateId, (req, res) => {
  try {
    const albumExists = albumData.getById(req.params.id);
    
    if (!albumExists) {
      return res.status(404).json({
        error: 'Not found',
        message: `Album with ID ${req.params.id} not found`
      });
    }
    
    // Only update provided fields
    const albumData_input = {};
    if (req.body.title !== undefined) albumData_input.title = req.body.title;
    if (req.body.artist !== undefined) albumData_input.artist = req.body.artist;
    if (req.body.year !== undefined) albumData_input.year = parseInt(req.body.year);
    if (req.body.genre !== undefined) albumData_input.genre = req.body.genre;
    if (req.body.tracks !== undefined) albumData_input.tracks = req.body.tracks;
    if (req.body.coverUrl !== undefined) albumData_input.coverUrl = req.body.coverUrl;
    if (req.body.rating !== undefined) albumData_input.rating = req.body.rating;
    
    const updatedAlbum = albumData.update(req.params.id, albumData_input);
    
    res.json({
      success: true,
      message: 'Album updated successfully',
      data: updatedAlbum
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update album'
    });
  }
});

// DELETE /api/albums/:id - Delete album
router.delete('/:id', validateId, (req, res) => {
  try {
    const albumExists = albumData.getById(req.params.id);
    
    if (!albumExists) {
      return res.status(404).json({
        error: 'Not found',
        message: `Album with ID ${req.params.id} not found`
      });
    }
    
    const deleted = albumData.delete(req.params.id);
    
    if (deleted) {
      res.json({
        success: true,
        message: `Album "${albumExists.title}" by ${albumExists.artist} deleted successfully`
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to delete album'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete album'
    });
  }
});

module.exports = router;
