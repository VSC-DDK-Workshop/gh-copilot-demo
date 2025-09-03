const Album = require('../models/Album');

class AlbumService {
  constructor() {
    this.albums = new Map();
    this.nextId = 1;
    this.initializeSampleData();
  }

  // Initialize with sample data
  initializeSampleData() {
    const sampleAlbums = [
      {
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
        ]
      },
      {
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        year: 1973,
        genre: "Progressive Rock",
        tracks: [
          "Speak to Me",
          "Breathe",
          "On the Run",
          "Time",
          "The Great Gig in the Sky",
          "Money",
          "Us and Them",
          "Any Colour You Like",
          "Brain Damage",
          "Eclipse"
        ]
      },
      {
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
        ]
      },
      {
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
        ]
      },
      {
        title: "Random Access Memories",
        artist: "Daft Punk",
        year: 2013,
        genre: "Electronic",
        tracks: [
          "Give Life Back to Music",
          "The Game of Love",
          "Giorgio by Moroder",
          "Within",
          "Instant Crush",
          "Lose Yourself to Dance",
          "Touch",
          "Get Lucky",
          "Beyond",
          "Motherboard",
          "Fragments of Time",
          "Doin' It Right",
          "Contact"
        ]
      }
    ];

    sampleAlbums.forEach(albumData => {
      const album = new Album(
        this.nextId++,
        albumData.title,
        albumData.artist,
        albumData.year,
        albumData.genre,
        albumData.tracks
      );
      this.albums.set(album.id, album);
    });
  }

  // Get all albums
  getAllAlbums() {
    return Array.from(this.albums.values());
  }

  // Get album by ID
  getAlbumById(id) {
    return this.albums.get(parseInt(id));
  }

  // Create new album
  createAlbum(albumData) {
    const validation = Album.validate(albumData);
    
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const album = new Album(
      this.nextId++,
      albumData.title,
      albumData.artist,
      albumData.year,
      albumData.genre,
      albumData.tracks || []
    );

    this.albums.set(album.id, album);
    return album;
  }

  // Update album
  updateAlbum(id, updateData) {
    const album = this.albums.get(parseInt(id));
    
    if (!album) {
      return null;
    }

    // Create a temporary object for validation
    const tempData = { ...album, ...updateData };
    const validation = Album.validate(tempData);
    
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    album.update(updateData);
    return album;
  }

  // Delete album
  deleteAlbum(id) {
    return this.albums.delete(parseInt(id));
  }

  // Search albums
  searchAlbums(query) {
    const searchTerm = query.toLowerCase();
    return Array.from(this.albums.values()).filter(album =>
      album.title.toLowerCase().includes(searchTerm) ||
      album.artist.toLowerCase().includes(searchTerm) ||
      album.genre.toLowerCase().includes(searchTerm)
    );
  }

  // Get albums by genre
  getAlbumsByGenre(genre) {
    return Array.from(this.albums.values()).filter(album =>
      album.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  // Get albums by artist
  getAlbumsByArtist(artist) {
    return Array.from(this.albums.values()).filter(album =>
      album.artist.toLowerCase() === artist.toLowerCase()
    );
  }
}

// Create singleton instance
const albumService = new AlbumService();

module.exports = albumService;
