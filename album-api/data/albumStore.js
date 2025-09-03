// In-memory data store for albums
let albums = [
  {
    id: 1,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    genre: "Pop",
    tracks: 9,
    duration: "42:19",
    label: "Epic Records",
    description: "One of the best-selling albums of all time",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z")
  },
  {
    id: 2,
    title: "Back in Black",
    artist: "AC/DC",
    year: 1980,
    genre: "Hard Rock",
    tracks: 10,
    duration: "42:11",
    label: "Atlantic Records",
    description: "Classic hard rock album featuring the iconic title track",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z")
  },
  {
    id: 3,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    genre: "Progressive Rock",
    tracks: 9,
    duration: "43:00",
    label: "Harvest Records",
    description: "Conceptual album exploring themes of conflict, greed, and mental illness",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z")
  },
  {
    id: 4,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    genre: "Rock",
    tracks: 17,
    duration: "47:23",
    label: "Apple Records",
    description: "The Beatles' penultimate studio album featuring the iconic medley",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z")
  },
  {
    id: 5,
    title: "Rumours",
    artist: "Fleetwood Mac",
    year: 1977,
    genre: "Rock",
    tracks: 11,
    duration: "38:41",
    label: "Warner Bros. Records",
    description: "Emotionally charged album created during band relationship turmoil",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z")
  },
  {
    id: 6,
    title: "Good Kid, M.A.A.D City",
    artist: "Kendrick Lamar",
    year: 2012,
    genre: "Hip Hop",
    tracks: 12,
    duration: "68:20",
    label: "Top Dawg Entertainment",
    description: "Conceptual album depicting Lamar's adolescence in Compton",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z")
  }
];

let nextId = 7;

class AlbumStore {
  static getAll() {
    return [...albums]; // Return a copy to prevent direct modification
  }

  static getById(id) {
    return albums.find(album => album.id === parseInt(id));
  }

  static create(albumData) {
    const newAlbum = {
      id: nextId++,
      ...albumData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    albums.push(newAlbum);
    return newAlbum;
  }

  static update(id, albumData) {
    const index = albums.findIndex(album => album.id === parseInt(id));
    if (index === -1) {
      return null;
    }
    
    albums[index] = {
      ...albums[index],
      ...albumData,
      id: parseInt(id), // Ensure ID doesn't change
      updatedAt: new Date()
    };
    
    return albums[index];
  }

  static delete(id) {
    const index = albums.findIndex(album => album.id === parseInt(id));
    if (index === -1) {
      return false;
    }
    
    albums.splice(index, 1);
    return true;
  }

  static search(query) {
    const searchTerm = query.toLowerCase();
    return albums.filter(album => 
      album.title.toLowerCase().includes(searchTerm) ||
      album.artist.toLowerCase().includes(searchTerm) ||
      album.genre.toLowerCase().includes(searchTerm)
    );
  }

  static getByGenre(genre) {
    return albums.filter(album => 
      album.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  static getByYear(year) {
    return albums.filter(album => album.year === parseInt(year));
  }

  // Reset data for testing
  static reset() {
    albums = [
      {
        id: 1,
        title: "Thriller",
        artist: "Michael Jackson",
        year: 1982,
        genre: "Pop",
        tracks: 9,
        duration: "42:19",
        label: "Epic Records",
        description: "One of the best-selling albums of all time",
        createdAt: new Date("2024-01-01T10:00:00Z"),
        updatedAt: new Date("2024-01-01T10:00:00Z")
      }
    ];
    nextId = 2;
  }
}

module.exports = AlbumStore;
