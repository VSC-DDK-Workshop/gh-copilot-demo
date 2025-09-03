const AlbumStore = require('../data/albumStore');

describe('AlbumStore', () => {
  beforeEach(() => {
    AlbumStore.reset();
  });

  describe('getAll()', () => {
    it('should return all albums', () => {
      const albums = AlbumStore.getAll();
      expect(albums).toHaveLength(1);
      expect(albums[0].title).toBe('Thriller');
    });

    it('should return a copy of albums array', () => {
      const albums1 = AlbumStore.getAll();
      const albums2 = AlbumStore.getAll();
      
      expect(albums1).not.toBe(albums2); // Different references
      expect(albums1).toEqual(albums2); // Same content
    });
  });

  describe('getById()', () => {
    it('should return album by ID', () => {
      const album = AlbumStore.getById(1);
      expect(album).toBeDefined();
      expect(album.title).toBe('Thriller');
    });

    it('should return undefined for non-existent ID', () => {
      const album = AlbumStore.getById(999);
      expect(album).toBeUndefined();
    });

    it('should handle string ID', () => {
      const album = AlbumStore.getById('1');
      expect(album).toBeDefined();
      expect(album.title).toBe('Thriller');
    });
  });

  describe('create()', () => {
    const newAlbumData = {
      title: 'Test Album',
      artist: 'Test Artist',
      year: 2023,
      genre: 'Rock'
    };

    it('should create a new album', () => {
      const album = AlbumStore.create(newAlbumData);
      
      expect(album.id).toBe(2);
      expect(album.title).toBe('Test Album');
      expect(album.createdAt).toBeInstanceOf(Date);
      expect(album.updatedAt).toBeInstanceOf(Date);
    });

    it('should increment ID for multiple albums', () => {
      const album1 = AlbumStore.create(newAlbumData);
      const album2 = AlbumStore.create({ ...newAlbumData, title: 'Second Album' });
      
      expect(album1.id).toBe(2);
      expect(album2.id).toBe(3);
    });

    it('should add album to the store', () => {
      AlbumStore.create(newAlbumData);
      const albums = AlbumStore.getAll();
      
      expect(albums).toHaveLength(2);
      expect(albums[1].title).toBe('Test Album');
    });
  });

  describe('update()', () => {
    const updateData = {
      title: 'Updated Title',
      artist: 'Updated Artist'
    };

    it('should update an existing album', () => {
      const updatedAlbum = AlbumStore.update(1, updateData);
      
      expect(updatedAlbum).toBeDefined();
      expect(updatedAlbum.id).toBe(1);
      expect(updatedAlbum.title).toBe('Updated Title');
      expect(updatedAlbum.artist).toBe('Updated Artist');
      expect(updatedAlbum.genre).toBe('Pop'); // Should keep existing fields
      expect(updatedAlbum.updatedAt).toBeInstanceOf(Date);
    });

    it('should return null for non-existent album', () => {
      const result = AlbumStore.update(999, updateData);
      expect(result).toBeNull();
    });

    it('should not change the album ID', () => {
      const updatedAlbum = AlbumStore.update(1, { ...updateData, id: 999 });
      expect(updatedAlbum.id).toBe(1);
    });

    it('should handle string ID', () => {
      const updatedAlbum = AlbumStore.update('1', updateData);
      expect(updatedAlbum).toBeDefined();
      expect(updatedAlbum.id).toBe(1);
    });
  });

  describe('delete()', () => {
    it('should delete an existing album', () => {
      const result = AlbumStore.delete(1);
      
      expect(result).toBe(true);
      expect(AlbumStore.getAll()).toHaveLength(0);
      expect(AlbumStore.getById(1)).toBeUndefined();
    });

    it('should return false for non-existent album', () => {
      const result = AlbumStore.delete(999);
      expect(result).toBe(false);
    });

    it('should handle string ID', () => {
      const result = AlbumStore.delete('1');
      expect(result).toBe(true);
    });
  });

  describe('search()', () => {
    beforeEach(() => {
      // Add more test data
      AlbumStore.create({
        title: 'Rock Album',
        artist: 'Rock Band',
        year: 2020,
        genre: 'Rock'
      });
      AlbumStore.create({
        title: 'Jazz Collection',
        artist: 'Jazz Musician',
        year: 2021,
        genre: 'Jazz'
      });
    });

    it('should search by title', () => {
      const results = AlbumStore.search('Rock');
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Rock Album');
    });

    it('should search by artist', () => {
      const results = AlbumStore.search('Jackson');
      expect(results).toHaveLength(1);
      expect(results[0].artist).toBe('Michael Jackson');
    });

    it('should search by genre', () => {
      const results = AlbumStore.search('Jazz');
      expect(results).toHaveLength(1);
      expect(results[0].genre).toBe('Jazz');
    });

    it('should be case insensitive', () => {
      const results = AlbumStore.search('ROCK');
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Rock Album');
    });

    it('should return empty array for no matches', () => {
      const results = AlbumStore.search('NonExistent');
      expect(results).toHaveLength(0);
    });
  });

  describe('getByGenre()', () => {
    beforeEach(() => {
      AlbumStore.create({
        title: 'Rock Album',
        artist: 'Rock Band',
        year: 2020,
        genre: 'Rock'
      });
    });

    it('should filter by genre', () => {
      const results = AlbumStore.getByGenre('Pop');
      expect(results).toHaveLength(1);
      expect(results[0].genre).toBe('Pop');
    });

    it('should be case insensitive', () => {
      const results = AlbumStore.getByGenre('ROCK');
      expect(results).toHaveLength(1);
      expect(results[0].genre).toBe('Rock');
    });

    it('should return empty array for no matches', () => {
      const results = AlbumStore.getByGenre('Classical');
      expect(results).toHaveLength(0);
    });
  });

  describe('getByYear()', () => {
    beforeEach(() => {
      AlbumStore.create({
        title: 'New Album',
        artist: 'New Artist',
        year: 2023,
        genre: 'Pop'
      });
    });

    it('should filter by year', () => {
      const results = AlbumStore.getByYear(1982);
      expect(results).toHaveLength(1);
      expect(results[0].year).toBe(1982);
    });

    it('should handle string year', () => {
      const results = AlbumStore.getByYear('2023');
      expect(results).toHaveLength(1);
      expect(results[0].year).toBe(2023);
    });

    it('should return empty array for no matches', () => {
      const results = AlbumStore.getByYear(2000);
      expect(results).toHaveLength(0);
    });
  });
});
