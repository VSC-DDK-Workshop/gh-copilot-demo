// In-memory storage for albums
let albums = [
  {
    id: 1,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    genre: "Pop",
    duration: 42,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Back in Black",
    artist: "AC/DC",
    year: 1980,
    genre: "Rock",
    duration: 41,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    genre: "Progressive Rock",
    duration: 43,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    genre: "Rock",
    duration: 47,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    title: "Kind of Blue",
    artist: "Miles Davis",
    year: 1959,
    genre: "Jazz",
    duration: 46,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let nextId = 6;

// Get all albums
const getAllAlbums = () => {
  return albums;
};

// Get album by ID
const getAlbumById = (id) => {
  return albums.find(album => album.id === id);
};

// Create new album
const createAlbum = (albumData) => {
  const newAlbum = {
    id: nextId++,
    title: albumData.title,
    artist: albumData.artist,
    year: albumData.year,
    genre: albumData.genre || null,
    duration: albumData.duration || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  albums.push(newAlbum);
  return newAlbum;
};

// Update album
const updateAlbum = (id, albumData) => {
  const albumIndex = albums.findIndex(album => album.id === id);
  if (albumIndex === -1) {
    return null;
  }

  const updatedAlbum = {
    ...albums[albumIndex],
    title: albumData.title,
    artist: albumData.artist,
    year: albumData.year,
    genre: albumData.genre || null,
    duration: albumData.duration || null,
    updatedAt: new Date().toISOString()
  };

  albums[albumIndex] = updatedAlbum;
  return updatedAlbum;
};

// Delete album
const deleteAlbum = (id) => {
  const albumIndex = albums.findIndex(album => album.id === id);
  if (albumIndex === -1) {
    return false;
  }

  albums.splice(albumIndex, 1);
  return true;
};

// Reset data (useful for testing)
const resetData = () => {
  albums = [
    {
      id: 1,
      title: "Thriller",
      artist: "Michael Jackson",
      year: 1982,
      genre: "Pop",
      duration: 42,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Back in Black",
      artist: "AC/DC",
      year: 1980,
      genre: "Rock",
      duration: 41,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      year: 1973,
      genre: "Progressive Rock",
      duration: 43,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 4,
      title: "Abbey Road",
      artist: "The Beatles",
      year: 1969,
      genre: "Rock",
      duration: 47,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 5,
      title: "Kind of Blue",
      artist: "Miles Davis",
      year: 1959,
      genre: "Jazz",
      duration: 46,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  nextId = 6;
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  resetData
};
