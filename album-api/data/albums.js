// In-memory data store for albums
let albums = [
  {
    id: 1,
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
    coverUrl: "https://example.com/covers/thriller.jpg",
    rating: 5,
    createdAt: new Date('2023-01-15T10:30:00Z'),
    updatedAt: new Date('2023-01-15T10:30:00Z')
  },
  {
    id: 2,
    title: "The Dark Side of the Moon",
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
    coverUrl: "https://example.com/covers/dark-side-moon.jpg",
    rating: 5,
    createdAt: new Date('2023-02-10T14:20:00Z'),
    updatedAt: new Date('2023-02-10T14:20:00Z')
  },
  {
    id: 3,
    title: "Back to Black",
    artist: "Amy Winehouse",
    year: 2006,
    genre: "Soul",
    tracks: [
      "Rehab",
      "You Know I'm No Good",
      "Me & Mr Jones",
      "Just Friends",
      "Back to Black",
      "Love Is a Losing Game",
      "Tears Dry on Their Own",
      "Wake Up Alone",
      "Some Unholy War",
      "He Can Only Hold Her",
      "Addicted"
    ],
    coverUrl: "https://example.com/covers/back-to-black.jpg",
    rating: 4,
    createdAt: new Date('2023-03-05T09:15:00Z'),
    updatedAt: new Date('2023-03-05T09:15:00Z')
  },
  {
    id: 4,
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
    coverUrl: "https://example.com/covers/abbey-road.jpg",
    rating: 5,
    createdAt: new Date('2023-04-12T16:45:00Z'),
    updatedAt: new Date('2023-04-12T16:45:00Z')
  },
  {
    id: 5,
    title: "Good Kid, M.A.A.D City",
    artist: "Kendrick Lamar",
    year: 2012,
    genre: "Hip Hop",
    tracks: [
      "Sherane a.k.a Master Splinter's Daughter",
      "Bitch, Don't Kill My Vibe",
      "Backseat Freestyle",
      "The Art of Peer Pressure",
      "Money Trees",
      "Poetic Justice",
      "good kid",
      "m.A.A.d city",
      "Swimming Pools (Drank)",
      "Sing About Me, I'm Dying of Thirst",
      "Real",
      "Compton"
    ],
    coverUrl: "https://example.com/covers/good-kid-maad-city.jpg",
    rating: 5,
    createdAt: new Date('2023-05-20T11:30:00Z'),
    updatedAt: new Date('2023-05-20T11:30:00Z')
  }
];

let nextId = 6;

// Data access functions
const albumData = {
  // Get all albums with optional filtering
  getAll: (filters = {}) => {
    let result = [...albums];
    
    if (filters.artist) {
      result = result.filter(album => 
        album.artist.toLowerCase().includes(filters.artist.toLowerCase())
      );
    }
    
    if (filters.genre) {
      result = result.filter(album => 
        album.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }
    
    if (filters.year) {
      result = result.filter(album => album.year == filters.year);
    }
    
    if (filters.minRating) {
      result = result.filter(album => album.rating >= parseInt(filters.minRating));
    }
    
    return result;
  },

  // Get album by ID
  getById: (id) => {
    return albums.find(album => album.id === parseInt(id));
  },

  // Create new album
  create: (albumData) => {
    const newAlbum = {
      id: nextId++,
      ...albumData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    albums.push(newAlbum);
    return newAlbum;
  },

  // Update existing album
  update: (id, albumData) => {
    const index = albums.findIndex(album => album.id === parseInt(id));
    if (index === -1) return null;
    
    albums[index] = {
      ...albums[index],
      ...albumData,
      id: albums[index].id, // Preserve original ID
      createdAt: albums[index].createdAt, // Preserve creation date
      updatedAt: new Date()
    };
    
    return albums[index];
  },

  // Delete album
  delete: (id) => {
    const index = albums.findIndex(album => album.id === parseInt(id));
    if (index === -1) return false;
    
    albums.splice(index, 1);
    return true;
  },

  // Get statistics
  getStats: () => {
    const genres = [...new Set(albums.map(album => album.genre))];
    const artists = [...new Set(albums.map(album => album.artist))];
    const totalTracks = albums.reduce((sum, album) => sum + (album.tracks?.length || 0), 0);
    
    return {
      totalAlbums: albums.length,
      totalArtists: artists.length,
      totalGenres: genres.length,
      totalTracks,
      averageRating: albums.reduce((sum, album) => sum + album.rating, 0) / albums.length,
      genres,
      artists
    };
  }
};

module.exports = albumData;
