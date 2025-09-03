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

  // Validate album data
  static validate(albumData) {
    const errors = [];
    
    if (!albumData.title || albumData.title.trim().length === 0) {
      errors.push('Title is required');
    }
    
    if (!albumData.artist || albumData.artist.trim().length === 0) {
      errors.push('Artist is required');
    }
    
    if (!albumData.year || !Number.isInteger(albumData.year) || albumData.year < 1900 || albumData.year > new Date().getFullYear()) {
      errors.push('Year must be a valid year between 1900 and current year');
    }
    
    if (!albumData.genre || albumData.genre.trim().length === 0) {
      errors.push('Genre is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Update album properties
  update(updateData) {
    const allowedFields = ['title', 'artist', 'year', 'genre', 'tracks'];
    
    allowedFields.forEach(field => {
      if (updateData.hasOwnProperty(field)) {
        this[field] = updateData[field];
      }
    });
    
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Album;
