const Album = require('../models/Album');

describe('Album Model', () => {
  describe('constructor', () => {
    test('should create album with all properties', () => {
      const album = new Album(1, 'Test Album', 'Test Artist', 2023, 'Rock', ['Track 1', 'Track 2']);
      
      expect(album.id).toBe(1);
      expect(album.title).toBe('Test Album');
      expect(album.artist).toBe('Test Artist');
      expect(album.year).toBe(2023);
      expect(album.genre).toBe('Rock');
      expect(album.tracks).toEqual(['Track 1', 'Track 2']);
      expect(album.createdAt).toBeDefined();
      expect(album.updatedAt).toBeDefined();
    });

    test('should create album with empty tracks array when not provided', () => {
      const album = new Album(1, 'Test Album', 'Test Artist', 2023, 'Rock');
      
      expect(album.tracks).toEqual([]);
    });
  });

  describe('validate', () => {
    test('should validate correct album data', () => {
      const albumData = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Rock'
      };

      const result = Album.validate(albumData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should return errors for missing title', () => {
      const albumData = {
        artist: 'Test Artist',
        year: 2023,
        genre: 'Rock'
      };

      const result = Album.validate(albumData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    test('should return errors for empty title', () => {
      const albumData = {
        title: '   ',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Rock'
      };

      const result = Album.validate(albumData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    test('should return errors for missing artist', () => {
      const albumData = {
        title: 'Test Album',
        year: 2023,
        genre: 'Rock'
      };

      const result = Album.validate(albumData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Artist is required');
    });

    test('should return errors for invalid year', () => {
      const albumData = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 1800,
        genre: 'Rock'
      };

      const result = Album.validate(albumData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Year must be a valid year between 1900 and current year');
    });

    test('should return errors for future year', () => {
      const albumData = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2030,
        genre: 'Rock'
      };

      const result = Album.validate(albumData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Year must be a valid year between 1900 and current year');
    });

    test('should return errors for missing genre', () => {
      const albumData = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2023
      };

      const result = Album.validate(albumData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Genre is required');
    });

    test('should return multiple errors for invalid data', () => {
      const albumData = {
        year: 1800
      };

      const result = Album.validate(albumData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(4);
    });
  });

  describe('update', () => {
    test('should update allowed fields', () => {
      const album = new Album(1, 'Original Title', 'Original Artist', 2020, 'Rock');
      const originalUpdatedAt = album.updatedAt;
      
      // Wait a bit to ensure updatedAt changes
      setTimeout(() => {
        album.update({
          title: 'Updated Title',
          artist: 'Updated Artist',
          year: 2023,
          genre: 'Pop',
          tracks: ['New Track']
        });

        expect(album.title).toBe('Updated Title');
        expect(album.artist).toBe('Updated Artist');
        expect(album.year).toBe(2023);
        expect(album.genre).toBe('Pop');
        expect(album.tracks).toEqual(['New Track']);
        expect(album.updatedAt).not.toBe(originalUpdatedAt);
      }, 1);
    });

    test('should ignore non-allowed fields', () => {
      const album = new Album(1, 'Test Album', 'Test Artist', 2023, 'Rock');
      const originalId = album.id;
      const originalCreatedAt = album.createdAt;

      album.update({
        id: 999,
        createdAt: '2020-01-01',
        invalidField: 'should be ignored'
      });

      expect(album.id).toBe(originalId);
      expect(album.createdAt).toBe(originalCreatedAt);
      expect(album.invalidField).toBeUndefined();
    });
  });
});
