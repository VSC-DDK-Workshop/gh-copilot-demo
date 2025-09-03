const albumService = require('../services/albumService');

describe('Album Service', () => {
  // Create a fresh instance for each test to avoid side effects
  let service;
  
  beforeEach(() => {
    service = require('../services/albumService');
    // Reset the service to initial state
    service.albums.clear();
    service.nextId = 1;
    service.initializeSampleData();
  });

  describe('getAllAlbums', () => {
    test('should return all albums', () => {
      const albums = service.getAllAlbums();
      expect(albums).toHaveLength(5); // Sample data has 5 albums
      expect(albums[0]).toHaveProperty('title');
      expect(albums[0]).toHaveProperty('artist');
      expect(albums[0]).toHaveProperty('year');
      expect(albums[0]).toHaveProperty('genre');
    });
  });

  describe('getAlbumById', () => {
    test('should return album by valid ID', () => {
      const album = service.getAlbumById(1);
      expect(album).toBeDefined();
      expect(album.id).toBe(1);
      expect(album.title).toBe('Thriller');
    });

    test('should return undefined for invalid ID', () => {
      const album = service.getAlbumById(999);
      expect(album).toBeUndefined();
    });
  });

  describe('createAlbum', () => {
    test('should create new album with valid data', () => {
      const albumData = {
        title: 'New Album',
        artist: 'New Artist',
        year: 2023,
        genre: 'Pop',
        tracks: ['Track 1', 'Track 2']
      };

      const album = service.createAlbum(albumData);
      expect(album).toBeDefined();
      expect(album.id).toBe(6); // Next ID after sample data
      expect(album.title).toBe('New Album');
      expect(album.artist).toBe('New Artist');
      expect(album.tracks).toEqual(['Track 1', 'Track 2']);
    });

    test('should create album with empty tracks when not provided', () => {
      const albumData = {
        title: 'New Album',
        artist: 'New Artist',
        year: 2023,
        genre: 'Pop'
      };

      const album = service.createAlbum(albumData);
      expect(album.tracks).toEqual([]);
    });

    test('should throw error for invalid data', () => {
      const albumData = {
        title: '',
        artist: 'New Artist',
        year: 2023,
        genre: 'Pop'
      };

      expect(() => service.createAlbum(albumData)).toThrow('Validation failed');
    });
  });

  describe('updateAlbum', () => {
    test('should update existing album', () => {
      const updateData = {
        title: 'Updated Title',
        genre: 'Updated Genre'
      };

      const album = service.updateAlbum(1, updateData);
      expect(album).toBeDefined();
      expect(album.title).toBe('Updated Title');
      expect(album.genre).toBe('Updated Genre');
      expect(album.artist).toBe('Michael Jackson'); // Unchanged
    });

    test('should return null for non-existent album', () => {
      const updateData = { title: 'Updated Title' };
      const album = service.updateAlbum(999, updateData);
      expect(album).toBeNull();
    });

    test('should throw error for invalid update data', () => {
      const updateData = { title: '' };
      expect(() => service.updateAlbum(1, updateData)).toThrow('Validation failed');
    });
  });

  describe('deleteAlbum', () => {
    test('should delete existing album', () => {
      const initialCount = service.getAllAlbums().length;
      const deleted = service.deleteAlbum(1);
      
      expect(deleted).toBe(true);
      expect(service.getAllAlbums()).toHaveLength(initialCount - 1);
      expect(service.getAlbumById(1)).toBeUndefined();
    });

    test('should return false for non-existent album', () => {
      const deleted = service.deleteAlbum(999);
      expect(deleted).toBe(false);
    });
  });

  describe('searchAlbums', () => {
    test('should find albums by title', () => {
      const results = service.searchAlbums('thriller');
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Thriller');
    });

    test('should find albums by artist', () => {
      const results = service.searchAlbums('beatles');
      expect(results).toHaveLength(1);
      expect(results[0].artist).toBe('The Beatles');
    });

    test('should find albums by genre', () => {
      const results = service.searchAlbums('rock');
      expect(results).toHaveLength(2); // Progressive Rock and Rock
    });

    test('should return empty array for no matches', () => {
      const results = service.searchAlbums('nonexistent');
      expect(results).toHaveLength(0);
    });

    test('should be case insensitive', () => {
      const results = service.searchAlbums('THRILLER');
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Thriller');
    });
  });

  describe('getAlbumsByGenre', () => {
    test('should return albums by exact genre match', () => {
      const results = service.getAlbumsByGenre('Rock');
      expect(results).toHaveLength(1);
      expect(results[0].artist).toBe('The Beatles');
    });

    test('should be case insensitive', () => {
      const results = service.getAlbumsByGenre('rock');
      expect(results).toHaveLength(1);
    });

    test('should return empty array for non-existent genre', () => {
      const results = service.getAlbumsByGenre('Classical');
      expect(results).toHaveLength(0);
    });
  });

  describe('getAlbumsByArtist', () => {
    test('should return albums by exact artist match', () => {
      const results = service.getAlbumsByArtist('Michael Jackson');
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Thriller');
    });

    test('should be case insensitive', () => {
      const results = service.getAlbumsByArtist('michael jackson');
      expect(results).toHaveLength(1);
    });

    test('should return empty array for non-existent artist', () => {
      const results = service.getAlbumsByArtist('Unknown Artist');
      expect(results).toHaveLength(0);
    });
  });
});
