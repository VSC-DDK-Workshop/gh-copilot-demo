const { v4: uuidv4 } = require('uuid');

// In-memory data store with sample albums
let albums = [
  {
    id: '1',
    title: 'Abbey Road',
    artist: 'The Beatles',
    genre: 'Rock',
    year: 1969,
    tracks: [
      'Come Together',
      'Something',
      'Maxwell\'s Silver Hammer',
      'Oh! Darling',
      'Octopus\'s Garden',
      'I Want You (She\'s So Heavy)',
      'Here Comes the Sun',
      'Because',
      'You Never Give Me Your Money',
      'Sun King',
      'Mean Mr. Mustard',
      'Polythene Pam',
      'She Came in Through the Bathroom Window',
      'Golden Slumbers',
      'Carry That Weight',
      'The End'
    ],
    duration: 2817, // seconds
    label: 'Apple Records',
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-01T10:00:00Z')
  },
  {
    id: '2',
    title: 'Thriller',
    artist: 'Michael Jackson',
    genre: 'Pop',
    year: 1982,
    tracks: [
      'Wanna Be Startin\' Somethin\'',
      'Baby Be Mine',
      'The Girl Is Mine',
      'Thriller',
      'Beat It',
      'Billie Jean',
      'Human Nature',
      'P.Y.T. (Pretty Young Thing)',
      'The Lady in My Life'
    ],
    duration: 2562,
    label: 'Epic Records',
    createdAt: new Date('2023-01-02T10:00:00Z'),
    updatedAt: new Date('2023-01-02T10:00:00Z')
  },
  {
    id: '3',
    title: 'Dark Side of the Moon',
    artist: 'Pink Floyd',
    genre: 'Progressive Rock',
    year: 1973,
    tracks: [
      'Speak to Me',
      'Breathe (In the Air)',
      'On the Run',
      'Time',
      'The Great Gig in the Sky',
      'Money',
      'Us and Them',
      'Any Colour You Like',
      'Brain Damage',
      'Eclipse'
    ],
    duration: 2590,
    label: 'Harvest Records',
    createdAt: new Date('2023-01-03T10:00:00Z'),
    updatedAt: new Date('2023-01-03T10:00:00Z')
  },
  {
    id: '4',
    title: 'Back to Black',
    artist: 'Amy Winehouse',
    genre: 'Soul',
    year: 2006,
    tracks: [
      'Rehab',
      'You Know I\'m No Good',
      'Me & Mr Jones',
      'Just Friends',
      'Back to Black',
      'Love Is a Losing Game',
      'Tears Dry on Their Own',
      'Wake Up Alone',
      'Some Unholy War',
      'He Can Only Hold Her',
      'Addicted'
    ],
    duration: 2129,
    label: 'Island Records',
    createdAt: new Date('2023-01-04T10:00:00Z'),
    updatedAt: new Date('2023-01-04T10:00:00Z')
  },
  {
    id: '5',
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    genre: 'Electronic',
    year: 2013,
    tracks: [
      'Give Life Back to Music',
      'The Game of Love',
      'Giorgio by Moroder',
      'Within',
      'Instant Crush',
      'Lose Yourself to Dance',
      'Touch',
      'Get Lucky',
      'Beyond',
      'Motherboard',
      'Fragments of Time',
      'Doin\' It Right',
      'Contact'
    ],
    duration: 4468,
    label: 'Columbia Records',
    createdAt: new Date('2023-01-05T10:00:00Z'),
    updatedAt: new Date('2023-01-05T10:00:00Z')
  }
];

/**
 * Get all albums with optional filtering and pagination
 */
function getAllAlbums(filters = {}, pagination = { page: 1, limit: 10 }) {
  let filteredAlbums = [...albums];
  
  // Apply filters
  if (filters.artist) {
    filteredAlbums = filteredAlbums.filter(album => 
      album.artist.toLowerCase().includes(filters.artist.toLowerCase())
    );
  }
  
  if (filters.genre) {
    filteredAlbums = filteredAlbums.filter(album => 
      album.genre.toLowerCase().includes(filters.genre.toLowerCase())
    );
  }
  
  if (filters.year) {
    filteredAlbums = filteredAlbums.filter(album => album.year === filters.year);
  }
  
  // Apply pagination
  const { page, limit } = pagination;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAlbums = filteredAlbums.slice(startIndex, endIndex);
  
  return {
    albums: paginatedAlbums,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredAlbums.length / limit),
      totalItems: filteredAlbums.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < filteredAlbums.length,
      hasPreviousPage: page > 1
    }
  };
}

/**
 * Get album by ID
 */
function getAlbumById(id) {
  return albums.find(album => album.id === id);
}

/**
 * Create a new album
 */
function createAlbum(albumData) {
  // Check for duplicate albums
  const existingAlbum = albums.find(album => 
    album.title.toLowerCase() === albumData.title.toLowerCase() && 
    album.artist.toLowerCase() === albumData.artist.toLowerCase()
  );
  
  if (existingAlbum) {
    throw new Error(`Album "${albumData.title}" by ${albumData.artist} already exists`);
  }
  
  const newAlbum = {
    id: uuidv4(),
    ...albumData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  albums.push(newAlbum);
  return newAlbum;
}

/**
 * Update album by ID
 */
function updateAlbum(id, updateData) {
  const albumIndex = albums.findIndex(album => album.id === id);
  
  if (albumIndex === -1) {
    return null;
  }
  
  // Prevent changing the ID
  delete updateData.id;
  
  const updatedAlbum = {
    ...albums[albumIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  albums[albumIndex] = updatedAlbum;
  return updatedAlbum;
}

/**
 * Delete album by ID
 */
function deleteAlbum(id) {
  const albumIndex = albums.findIndex(album => album.id === id);
  
  if (albumIndex === -1) {
    return false;
  }
  
  albums.splice(albumIndex, 1);
  return true;
}

/**
 * Search albums by title or artist
 */
function searchAlbums(query) {
  const searchTerm = query.toLowerCase();
  
  return albums.filter(album => 
    album.title.toLowerCase().includes(searchTerm) ||
    album.artist.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get albums count
 */
function getAlbumsCount() {
  return albums.length;
}

/**
 * Reset albums data (useful for testing)
 */
function resetAlbums() {
  albums = [];
}

/**
 * Seed sample data (useful for testing)
 */
function seedSampleData() {
  resetAlbums();
  // Re-add the initial sample data
  albums = [
    {
      id: '1',
      title: 'Abbey Road',
      artist: 'The Beatles',
      genre: 'Rock',
      year: 1969,
      tracks: ['Come Together', 'Something', 'Here Comes the Sun'],
      duration: 2817,
      label: 'Apple Records',
      createdAt: new Date('2023-01-01T10:00:00Z'),
      updatedAt: new Date('2023-01-01T10:00:00Z')
    },
    {
      id: '2',
      title: 'Thriller',
      artist: 'Michael Jackson',
      genre: 'Pop',
      year: 1982,
      tracks: ['Thriller', 'Beat It', 'Billie Jean'],
      duration: 2562,
      label: 'Epic Records',
      createdAt: new Date('2023-01-02T10:00:00Z'),
      updatedAt: new Date('2023-01-02T10:00:00Z')
    }
  ];
}

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  searchAlbums,
  getAlbumsCount,
  resetAlbums,
  seedSampleData
};
