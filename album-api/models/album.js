const { v4: uuidv4 } = require('uuid');

// In-memory album collection
let albums = [
  {
    id: '1',
    title: 'Thriller',
    artist: 'Michael Jackson',
    year: 1982,
    genre: 'Pop',
    tracks: 9
  },
  {
    id: '2',
    title: 'Back in Black',
    artist: 'AC/DC',
    year: 1980,
    genre: 'Rock',
    tracks: 10
  },
  {
    id: '3',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
    genre: 'Progressive Rock',
    tracks: 10
  },
  {
    id: '4',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    year: 1959,
    genre: 'Jazz',
    tracks: 5
  },
  {
    id: '5',
    title: 'Abbey Road',
    artist: 'The Beatles',
    year: 1969,
    genre: 'Rock',
    tracks: 17
  }
];

// Get all albums
const getAllAlbums = () => {
  return albums;
};

// Get album by ID
const getAlbumById = (id) => {
  return albums.find(album => album.id === id);
};

// Create a new album
const createAlbum = (albumData) => {
  const newAlbum = {
    id: uuidv4(),
    ...albumData
  };
  albums.push(newAlbum);
  return newAlbum;
};

// Update an existing album
const updateAlbum = (id, albumData) => {
  const index = albums.findIndex(album => album.id === id);
  if (index === -1) return null;
  
  const updatedAlbum = {
    ...albums[index],
    ...albumData,
    id // Ensure ID doesn't change
  };
  
  albums[index] = updatedAlbum;
  return updatedAlbum;
};

// Delete an album
const deleteAlbum = (id) => {
  const index = albums.findIndex(album => album.id === id);
  if (index === -1) return false;
  
  albums.splice(index, 1);
  return true;
};

// Reset data (useful for testing)
const resetAlbums = () => {
  albums = [
    {
      id: '1',
      title: 'Thriller',
      artist: 'Michael Jackson',
      year: 1982,
      genre: 'Pop',
      tracks: 9
    },
    {
      id: '2',
      title: 'Back in Black',
      artist: 'AC/DC',
      year: 1980,
      genre: 'Rock',
      tracks: 10
    },
    {
      id: '3',
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      genre: 'Progressive Rock',
      tracks: 10
    },
    {
      id: '4',
      title: 'Kind of Blue',
      artist: 'Miles Davis',
      year: 1959,
      genre: 'Jazz',
      tracks: 5
    },
    {
      id: '5',
      title: 'Abbey Road',
      artist: 'The Beatles',
      year: 1969,
      genre: 'Rock',
      tracks: 17
    }
  ];
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  resetAlbums
};
