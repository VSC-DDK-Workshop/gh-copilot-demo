const albumData = require('../data/albums');

describe('Album Data Layer', () => {
  describe('getAll', () => {
    it('should return all albums when no filters applied', () => {
      const albums = albumData.getAll();
      expect(Array.isArray(albums)).toBe(true);
      expect(albums.length).toBeGreaterThan(0);
    });

    it('should filter by artist', () => {
      const albums = albumData.getAll({ artist: 'Michael Jackson' });
      expect(albums.every(album => 
        album.artist.toLowerCase().includes('michael jackson')
      )).toBe(true);
    });

    it('should filter by genre', () => {
      const albums = albumData.getAll({ genre: 'Rock' });
      expect(albums.every(album => 
        album.genre.toLowerCase().includes('rock')
      )).toBe(true);
    });

    it('should filter by year', () => {
      const albums = albumData.getAll({ year: 1982 });
      expect(albums.every(album => album.year === 1982)).toBe(true);
    });

    it('should filter by minimum rating', () => {
      const albums = albumData.getAll({ minRating: 5 });
      expect(albums.every(album => album.rating >= 5)).toBe(true);
    });
  });

  describe('getById', () => {
    it('should return album for valid ID', () => {
      const album = albumData.getById(1);
      expect(album).toBeDefined();
      expect(album.id).toBe(1);
    });

    it('should return undefined for invalid ID', () => {
      const album = albumData.getById(999);
      expect(album).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a new album', () => {
      const newAlbumData = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Test Genre',
        tracks: ['Track 1', 'Track 2'],
        rating: 4
      };

      const album = albumData.create(newAlbumData);
      
      expect(album).toBeDefined();
      expect(album.id).toBeDefined();
      expect(album.title).toBe(newAlbumData.title);
      expect(album.artist).toBe(newAlbumData.artist);
      expect(album.createdAt).toBeDefined();
      expect(album.updatedAt).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update existing album', () => {
      const updateData = {
        title: 'Updated Title',
        rating: 5
      };

      const updatedAlbum = albumData.update(1, updateData);
      
      expect(updatedAlbum).toBeDefined();
      expect(updatedAlbum.title).toBe(updateData.title);
      expect(updatedAlbum.rating).toBe(updateData.rating);
      expect(updatedAlbum.updatedAt).toBeDefined();
    });

    it('should return null for non-existent album', () => {
      const result = albumData.update(999, { title: 'Test' });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete existing album', () => {
      // First create an album to delete
      const newAlbum = albumData.create({
        title: 'Album to Delete',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Test'
      });

      const result = albumData.delete(newAlbum.id);
      expect(result).toBe(true);
      
      // Verify it's deleted
      const deletedAlbum = albumData.getById(newAlbum.id);
      expect(deletedAlbum).toBeUndefined();
    });

    it('should return false for non-existent album', () => {
      const result = albumData.delete(999);
      expect(result).toBe(false);
    });
  });

  describe('getStats', () => {
    it('should return statistics', () => {
      const stats = albumData.getStats();
      
      expect(stats).toHaveProperty('totalAlbums');
      expect(stats).toHaveProperty('totalArtists');
      expect(stats).toHaveProperty('totalGenres');
      expect(stats).toHaveProperty('totalTracks');
      expect(stats).toHaveProperty('averageRating');
      expect(stats).toHaveProperty('genres');
      expect(stats).toHaveProperty('artists');
      
      expect(typeof stats.totalAlbums).toBe('number');
      expect(typeof stats.averageRating).toBe('number');
      expect(Array.isArray(stats.genres)).toBe(true);
      expect(Array.isArray(stats.artists)).toBe(true);
    });
  });
});
