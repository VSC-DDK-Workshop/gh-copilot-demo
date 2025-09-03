// Album data model and in-memory storage
class Album {
    constructor(id, title, artist, year, genre, tracks = []) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.genre = genre;
        this.tracks = tracks;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    // Update album properties
    update(data) {
        if (data.title) this.title = data.title;
        if (data.artist) this.artist = data.artist;
        if (data.year) this.year = data.year;
        if (data.genre) this.genre = data.genre;
        if (data.tracks) this.tracks = data.tracks;
        this.updatedAt = new Date().toISOString();
    }

    // Validate album data
    static validate(data) {
        const errors = [];
        
        if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
            errors.push('Title is required and must be a non-empty string');
        }
        
        if (!data.artist || typeof data.artist !== 'string' || data.artist.trim().length === 0) {
            errors.push('Artist is required and must be a non-empty string');
        }
        
        if (!data.year || !Number.isInteger(data.year) || data.year < 1800 || data.year > new Date().getFullYear()) {
            errors.push('Year is required and must be a valid year between 1800 and current year');
        }
        
        if (!data.genre || typeof data.genre !== 'string' || data.genre.trim().length === 0) {
            errors.push('Genre is required and must be a non-empty string');
        }
        
        return errors;
    }
}

// In-memory album collection with sample data
let albums = [
    new Album(1, "Abbey Road", "The Beatles", 1969, "Rock", [
        "Come Together", "Something", "Maxwell's Silver Hammer", "Oh! Darling", "Octopus's Garden"
    ]),
    new Album(2, "The Dark Side of the Moon", "Pink Floyd", 1973, "Progressive Rock", [
        "Speak to Me", "Breathe", "On the Run", "Time", "The Great Gig in the Sky"
    ]),
    new Album(3, "Thriller", "Michael Jackson", 1982, "Pop", [
        "Wanna Be Startin' Somethin'", "Baby Be Mine", "The Girl Is Mine", "Thriller", "Beat It"
    ]),
    new Album(4, "Rumours", "Fleetwood Mac", 1977, "Rock", [
        "Second Hand News", "Dreams", "Never Going Back Again", "Don't Stop", "Go Your Own Way"
    ]),
    new Album(5, "Back in Black", "AC/DC", 1980, "Hard Rock", [
        "Hells Bells", "Shoot to Thrill", "What Do You Do for Money Honey", "Given the Dog a Bone", "Let Me Put My Love into You"
    ])
];

// Get next available ID
let nextId = albums.length + 1;

// Album storage operations
const albumStorage = {
    // Get all albums
    getAll() {
        return albums;
    },

    // Get album by ID
    getById(id) {
        return albums.find(album => album.id === parseInt(id));
    },

    // Add new album
    add(albumData) {
        const album = new Album(
            nextId++,
            albumData.title,
            albumData.artist,
            albumData.year,
            albumData.genre,
            albumData.tracks || []
        );
        albums.push(album);
        return album;
    },

    // Update album
    update(id, albumData) {
        const album = this.getById(id);
        if (!album) return null;
        
        album.update(albumData);
        return album;
    },

    // Delete album
    delete(id) {
        const index = albums.findIndex(album => album.id === parseInt(id));
        if (index === -1) return false;
        
        albums.splice(index, 1);
        return true;
    },

    // Search albums by title or artist
    search(query) {
        const searchTerm = query.toLowerCase();
        return albums.filter(album => 
            album.title.toLowerCase().includes(searchTerm) ||
            album.artist.toLowerCase().includes(searchTerm)
        );
    }
};

module.exports = { Album, albumStorage };
