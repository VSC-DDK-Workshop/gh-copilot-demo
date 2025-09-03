const albumModel = require('../models/album');

describe('Album Model', () => {
  beforeEach(() => {
    // Reset the album collection before each test
    albumModel.resetAlbums();
  });
  
  describe('getAllAlbums', () => {
    it('should return all albums', () => {
      const albums = albumModel.getAllAlbums();
      expect(albums).toHaveLength(5);
      expect(albums[0].title).toBe('Thriller');
    });
  });
  
  describe('getAlbumById', () => {
    it('should return an album by id', () => {
      const album = albumModel.getAlbumById('3');
      expect(album).toBeDefined();
      expect(album.title).toBe('The Dark Side of the Moon');
      expect(album.artist).toBe('Pink Floyd');
    });
    
    it('should return undefined for non-existent id', () => {
      const album = albumModel.getAlbumById('999');
      expect(album).toBeUndefined();
    });
  });
  
  describe('createAlbum', () => {
    it('should create a new album', () => {
      const newAlbum = {
        title: 'Nevermind',
        artist: 'Nirvana',
        year: 1991,
        genre: 'Grunge',
        tracks: 12
      };
      
      const created = albumModel.createAlbum(newAlbum);
      expect(created).toHaveProperty('id');
      expect(created.title).toBe('Nevermind');
      
      // Check that it was added to the collection
      const albums = albumModel.getAllAlbums();
      expect(albums).toHaveLength(6);
    });
  });
  
  describe('updateAlbum', () => {
    it('should update an existing album', () => {
      const updated = albumModel.updateAlbum('2', { genre: 'Hard Rock', tracks: 11 });
      expect(updated).toBeDefined();
      expect(updated.genre).toBe('Hard Rock');
      expect(updated.tracks).toBe(11);
      expect(updated.title).toBe('Back in Black'); // Unchanged property
    });
    
    it('should return null for non-existent id', () => {
      const updated = albumModel.updateAlbum('999', { genre: 'Pop' });
      expect(updated).toBeNull();
    });
  });
  
  describe('deleteAlbum', () => {
    it('should delete an existing album', () => {
      const deleted = albumModel.deleteAlbum('4');
      expect(deleted).toBe(true);
      
      // Check that it was removed from the collection
      const albums = albumModel.getAllAlbums();
      expect(albums).toHaveLength(4);
      expect(albums.find(a => a.id === '4')).toBeUndefined();
    });
    
    it('should return false for non-existent id', () => {
      const deleted = albumModel.deleteAlbum('999');
      expect(deleted).toBe(false);
    });
  });
});
