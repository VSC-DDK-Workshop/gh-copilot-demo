const albumsData = require('../data/albums');

describe('Albums Data Module', () => {
  beforeEach(() => {
    albumsData.resetData();
  });

  describe('getAllAlbums', () => {
    it('should return all albums', () => {
      const albums = albumsData.getAllAlbums();
      expect(albums).toHaveLength(5);
      expect(albums[0].title).toBe('Thriller');
    });
  });

  describe('getAlbumById', () => {
    it('should return album by ID', () => {
      const album = albumsData.getAlbumById(1);
      expect(album).toBeTruthy();
      expect(album.title).toBe('Thriller');
      expect(album.artist).toBe('Michael Jackson');
    });

    it('should return undefined for non-existent ID', () => {
      const album = albumsData.getAlbumById(999);
      expect(album).toBeUndefined();
    });
  });

  describe('createAlbum', () => {
    it('should create and return new album', () => {
      const newAlbumData = {
        title: 'New Album',
        artist: 'New Artist',
        year: 2023,
        genre: 'Rock',
        duration: 40
      };

      const createdAlbum = albumsData.createAlbum(newAlbumData);

      expect(createdAlbum).toBeTruthy();
      expect(createdAlbum.id).toBe(6); // Next available ID
      expect(createdAlbum.title).toBe(newAlbumData.title);
      expect(createdAlbum.artist).toBe(newAlbumData.artist);
      expect(createdAlbum).toHaveProperty('createdAt');
      expect(createdAlbum).toHaveProperty('updatedAt');

      // Verify it's added to the collection
      const allAlbums = albumsData.getAllAlbums();
      expect(allAlbums).toHaveLength(6);
    });

    it('should handle optional fields correctly', () => {
      const minimalAlbum = {
        title: 'Minimal Album',
        artist: 'Minimal Artist',
        year: 2023
      };

      const createdAlbum = albumsData.createAlbum(minimalAlbum);

      expect(createdAlbum.genre).toBeNull();
      expect(createdAlbum.duration).toBeNull();
    });
  });

  describe('updateAlbum', () => {
    it('should update existing album', () => {
      const updateData = {
        title: 'Updated Thriller',
        artist: 'Michael Jackson',
        year: 1982,
        genre: 'Pop/Rock',
        duration: 45
      };

      const updatedAlbum = albumsData.updateAlbum(1, updateData);

      expect(updatedAlbum).toBeTruthy();
      expect(updatedAlbum.id).toBe(1);
      expect(updatedAlbum.title).toBe('Updated Thriller');
      expect(updatedAlbum.genre).toBe('Pop/Rock');
      expect(updatedAlbum.createdAt).toBeTruthy(); // Should preserve original
      expect(updatedAlbum.updatedAt).toBeTruthy();
    });

    it('should return null for non-existent album', () => {
      const updateData = {
        title: 'Non-existent',
        artist: 'Unknown',
        year: 2023
      };

      const result = albumsData.updateAlbum(999, updateData);
      expect(result).toBeNull();
    });
  });

  describe('deleteAlbum', () => {
    it('should delete existing album', () => {
      const initialCount = albumsData.getAllAlbums().length;
      const deleted = albumsData.deleteAlbum(1);

      expect(deleted).toBe(true);
      expect(albumsData.getAllAlbums()).toHaveLength(initialCount - 1);
      expect(albumsData.getAlbumById(1)).toBeUndefined();
    });

    it('should return false for non-existent album', () => {
      const deleted = albumsData.deleteAlbum(999);
      expect(deleted).toBe(false);
    });
  });

  describe('resetData', () => {
    it('should reset to initial state', () => {
      // Add a new album
      albumsData.createAlbum({
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2023
      });

      expect(albumsData.getAllAlbums()).toHaveLength(6);

      // Reset data
      albumsData.resetData();

      expect(albumsData.getAllAlbums()).toHaveLength(5);
      expect(albumsData.getAlbumById(6)).toBeUndefined();
    });
  });
});
