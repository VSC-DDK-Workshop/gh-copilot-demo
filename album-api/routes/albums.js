const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory storage for albums
let albums = [
  {
    id: uuidv4(),
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    genre: "Rock",
    tracks: [
      "Come Together",
      "Something",
      "Maxwell's Silver Hammer",
      "Oh! Darling",
      "Octopus's Garden",
      "I Want You (She's So Heavy)",
      "Here Comes the Sun",
      "Because",
      "You Never Give Me Your Money",
      "Sun King",
      "Mean Mr. Mustard",
      "Polythene Pam",
      "She Came in Through the Bathroom Window",
      "Golden Slumbers",
      "Carry That Weight",
      "The End",
      "Her Majesty"
    ],
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: uuidv4(),
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    genre: "Pop",
    tracks: [
      "Wanna Be Startin' Somethin'",
      "Baby Be Mine",
      "The Girl Is Mine",
      "Thriller",
      "Beat It",
      "Billie Jean",
      "Human Nature",
      "P.Y.T. (Pretty Young Thing)",
      "The Lady in My Life"
    ],
    createdAt: new Date('2024-01-16T14:20:00Z'),
    updatedAt: new Date('2024-01-16T14:20:00Z')
  },
  {
    id: uuidv4(),
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    genre: "Progressive Rock",
    tracks: [
      "Speak to Me",
      "Breathe (In the Air)",
      "On the Run",
      "Time",
      "The Great Gig in the Sky",
      "Money",
      "Us and Them",
      "Any Colour You Like",
      "Brain Damage",
      "Eclipse"
    ],
    createdAt: new Date('2024-01-17T09:15:00Z'),
    updatedAt: new Date('2024-01-17T09:15:00Z')
  },
  {
    id: uuidv4(),
    title: "Rumours",
    artist: "Fleetwood Mac",
    year: 1977,
    genre: "Rock",
    tracks: [
      "Second Hand News",
      "Dreams",
      "Never Going Back Again",
      "Don't Stop",
      "Go Your Own Way",
      "Songbird",
      "The Chain",
      "You Make Loving Fun",
      "I Don't Want to Know",
      "Oh Daddy",
      "Gold Dust Woman"
    ],
    createdAt: new Date('2024-01-18T16:45:00Z'),
    updatedAt: new Date('2024-01-18T16:45:00Z')
  },
  {
    id: uuidv4(),
    title: "Back in Black",
    artist: "AC/DC",
    year: 1980,
    genre: "Hard Rock",
    tracks: [
      "Hells Bells",
      "Shoot to Thrill",
      "What Do You Do for Money Honey",
      "Givin the Dog a Bone",
      "Let Me Put My Love into You",
      "Back in Black",
      "You Shook Me All Night Long",
      "Have a Drink on Me",
      "Shake a Leg",
      "Rock and Roll Ain't Noise Pollution"
    ],
    createdAt: new Date('2024-01-19T11:30:00Z'),
    updatedAt: new Date('2024-01-19T11:30:00Z')
  }
];

// Helper function to validate album data
const validateAlbum = (albumData) => {
  const errors = [];
  
  if (!albumData.title || albumData.title.trim().length === 0) {
    errors.push('Title is required and cannot be empty');
  }
  
  if (!albumData.artist || albumData.artist.trim().length === 0) {
    errors.push('Artist is required and cannot be empty');
  }
  
  if (!albumData.year || !Number.isInteger(albumData.year) || albumData.year < 1900 || albumData.year > new Date().getFullYear()) {
    errors.push('Year must be a valid integer between 1900 and current year');
  }
  
  if (!albumData.genre || albumData.genre.trim().length === 0) {
    errors.push('Genre is required and cannot be empty');
  }
  
  if (albumData.tracks && !Array.isArray(albumData.tracks)) {
    errors.push('Tracks must be an array');
  }
  
  return errors;
};

// GET /api/albums - List all albums
router.get('/', (req, res) => {
  try {
    // Optional query parameters for filtering
    const { artist, genre, year } = req.query;
    let filteredAlbums = albums;
    
    if (artist) {
      filteredAlbums = filteredAlbums.filter(album => 
        album.artist.toLowerCase().includes(artist.toLowerCase())
      );
    }
    
    if (genre) {
      filteredAlbums = filteredAlbums.filter(album => 
        album.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
    
    if (year) {
      filteredAlbums = filteredAlbums.filter(album => 
        album.year === parseInt(year)
      );
    }
    
    res.status(200).json({
      success: true,
      count: filteredAlbums.length,
      data: filteredAlbums
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve albums',
      message: error.message
    });
  }
});

// GET /api/albums/:id - Get a specific album by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const album = albums.find(album => album.id === id);
    
    if (!album) {
      return res.status(404).json({
        success: false,
        error: 'Album not found',
        message: `Album with ID ${id} does not exist`
      });
    }
    
    res.status(200).json({
      success: true,
      data: album
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve album',
      message: error.message
    });
  }
});

// POST /api/albums - Create a new album
router.post('/', (req, res) => {
  try {
    const albumData = req.body;
    
    // Validate input data
    const validationErrors = validateAlbum(albumData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Invalid album data provided',
        details: validationErrors
      });
    }
    
    // Create new album
    const newAlbum = {
      id: uuidv4(),
      title: albumData.title.trim(),
      artist: albumData.artist.trim(),
      year: parseInt(albumData.year),
      genre: albumData.genre.trim(),
      tracks: albumData.tracks || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    albums.push(newAlbum);
    
    res.status(201).json({
      success: true,
      message: 'Album created successfully',
      data: newAlbum
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create album',
      message: error.message
    });
  }
});

// PUT /api/albums/:id - Update an existing album
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const albumData = req.body;
    
    // Find the album to update
    const albumIndex = albums.findIndex(album => album.id === id);
    if (albumIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Album not found',
        message: `Album with ID ${id} does not exist`
      });
    }
    
    // Validate input data
    const validationErrors = validateAlbum(albumData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Invalid album data provided',
        details: validationErrors
      });
    }
    
    // Update the album
    const updatedAlbum = {
      ...albums[albumIndex],
      title: albumData.title.trim(),
      artist: albumData.artist.trim(),
      year: parseInt(albumData.year),
      genre: albumData.genre.trim(),
      tracks: albumData.tracks || albums[albumIndex].tracks,
      updatedAt: new Date()
    };
    
    albums[albumIndex] = updatedAlbum;
    
    res.status(200).json({
      success: true,
      message: 'Album updated successfully',
      data: updatedAlbum
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update album',
      message: error.message
    });
  }
});

// DELETE /api/albums/:id - Delete an album
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the album to delete
    const albumIndex = albums.findIndex(album => album.id === id);
    if (albumIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Album not found',
        message: `Album with ID ${id} does not exist`
      });
    }
    
    // Remove the album
    const deletedAlbum = albums.splice(albumIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      message: 'Album deleted successfully',
      data: deletedAlbum
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete album',
      message: error.message
    });
  }
});

module.exports = router;
