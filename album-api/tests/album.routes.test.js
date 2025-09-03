const request = require('supertest');
const app = require('../index');
const albumModel = require('../models/album');

describe('Album API Routes', () => {
  beforeEach(() => {
    // Reset the album collection before each test
    albumModel.resetAlbums();
  });
  
  describe('GET /api/albums', () => {
    it('should return all albums', async () => {
      const res = await request(app).get('/api/albums');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(5);
      expect(res.body[0].title).toBe('Thriller');
    });
  });
  
  describe('GET /api/albums/:id', () => {
    it('should return an album by id', async () => {
      const res = await request(app).get('/api/albums/3');
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('The Dark Side of the Moon');
      expect(res.body.artist).toBe('Pink Floyd');
    });
    
    it('should return 404 for non-existent id', async () => {
      const res = await request(app).get('/api/albums/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message');
    });
  });
  
  describe('POST /api/albums', () => {
    it('should create a new album', async () => {
      const newAlbum = {
        title: 'Nevermind',
        artist: 'Nirvana',
        year: 1991,
        genre: 'Grunge',
        tracks: 12
      };
      
      const res = await request(app)
        .post('/api/albums')
        .send(newAlbum);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Nevermind');
      
      // Check that it was added to the collection
      const albums = albumModel.getAllAlbums();
      expect(albums).toHaveLength(6);
    });
    
    it('should return 400 for invalid album data', async () => {
      const invalidAlbum = { title: 'Missing Artist' };
      
      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum);
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
  
  describe('PUT /api/albums/:id', () => {
    it('should update an existing album', async () => {
      const updateData = { genre: 'Hard Rock', tracks: 11 };
      
      const res = await request(app)
        .put('/api/albums/2')
        .send(updateData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.genre).toBe('Hard Rock');
      expect(res.body.tracks).toBe(11);
      expect(res.body.title).toBe('Back in Black'); // Unchanged property
    });
    
    it('should return 404 for non-existent id', async () => {
      const res = await request(app)
        .put('/api/albums/999')
        .send({ genre: 'Pop' });
      
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message');
    });
  });
  
  describe('DELETE /api/albums/:id', () => {
    it('should delete an existing album', async () => {
      const res = await request(app).delete('/api/albums/4');
      expect(res.statusCode).toBe(204);
      
      // Check that it was removed from the collection
      const albums = albumModel.getAllAlbums();
      expect(albums).toHaveLength(4);
      expect(albums.find(a => a.id === '4')).toBeUndefined();
    });
    
    it('should return 404 for non-existent id', async () => {
      const res = await request(app).delete('/api/albums/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message');
    });
  });
});
