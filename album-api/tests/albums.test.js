const request = require('supertest');
const app = require('../app');

describe('Album API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('service', 'album-api');
    });
  });

  describe('GET /api/albums', () => {
    it('should return all albums', async () => {
      const response = await request(app)
        .get('/api/albums')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('count');
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });

    it('should filter albums by artist', async () => {
      const response = await request(app)
        .get('/api/albums?artist=Michael Jackson')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.every(album => 
        album.artist.toLowerCase().includes('michael jackson')
      )).toBe(true);
    });

    it('should filter albums by genre', async () => {
      const response = await request(app)
        .get('/api/albums?genre=Pop')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.every(album => 
        album.genre.toLowerCase().includes('pop')
      )).toBe(true);
    });

    it('should filter albums by year', async () => {
      const response = await request(app)
        .get('/api/albums?year=1982')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.every(album => album.year === 1982)).toBe(true);
    });

    it('should filter albums by minimum rating', async () => {
      const response = await request(app)
        .get('/api/albums?minRating=5')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.every(album => album.rating >= 5)).toBe(true);
    });

    it('should return validation error for invalid year filter', async () => {
      const response = await request(app)
        .get('/api/albums?year=invalid')
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Validation failed');
    });
  });

  describe('GET /api/albums/stats', () => {
    it('should return album statistics', async () => {
      const response = await request(app)
        .get('/api/albums/stats')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('totalAlbums');
      expect(response.body.data).toHaveProperty('totalArtists');
      expect(response.body.data).toHaveProperty('totalGenres');
      expect(response.body.data).toHaveProperty('totalTracks');
      expect(response.body.data).toHaveProperty('averageRating');
      expect(response.body.data).toHaveProperty('genres');
      expect(response.body.data).toHaveProperty('artists');
    });
  });

  describe('GET /api/albums/:id', () => {
    it('should return a specific album', async () => {
      const response = await request(app)
        .get('/api/albums/1')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('artist');
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .get('/api/albums/999')
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'Not found');
    });

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .get('/api/albums/invalid')
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Invalid ID');
    });
  });

  describe('POST /api/albums', () => {
    const validAlbum = {
      title: 'Test Album',
      artist: 'Test Artist',
      year: 2023,
      genre: 'Test Genre',
      tracks: ['Track 1', 'Track 2'],
      rating: 4
    };

    it('should create a new album', async () => {
      const response = await request(app)
        .post('/api/albums')
        .send(validAlbum)
        .expect(201);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Album created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('title', validAlbum.title);
      expect(response.body.data).toHaveProperty('artist', validAlbum.artist);
      expect(response.body.data).toHaveProperty('createdAt');
      expect(response.body.data).toHaveProperty('updatedAt');
    });

    it('should return validation error for missing title', async () => {
      const invalidAlbum = { ...validAlbum };
      delete invalidAlbum.title;
      
      const response = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    it('should return validation error for invalid year', async () => {
      const invalidAlbum = { ...validAlbum, year: 1800 };
      
      const response = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    it('should return validation error for invalid rating', async () => {
      const invalidAlbum = { ...validAlbum, rating: 6 };
      
      const response = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Validation failed');
    });
  });

  describe('PUT /api/albums/:id', () => {
    const updatedAlbum = {
      title: 'Updated Album',
      artist: 'Updated Artist',
      year: 2024,
      genre: 'Updated Genre',
      tracks: ['Updated Track 1', 'Updated Track 2'],
      rating: 5
    };

    it('should update an existing album', async () => {
      const response = await request(app)
        .put('/api/albums/1')
        .send(updatedAlbum)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Album updated successfully');
      expect(response.body.data).toHaveProperty('title', updatedAlbum.title);
      expect(response.body.data).toHaveProperty('artist', updatedAlbum.artist);
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .put('/api/albums/999')
        .send(updatedAlbum)
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'Not found');
    });
  });

  describe('PATCH /api/albums/:id', () => {
    it('should partially update an existing album', async () => {
      const partialUpdate = { title: 'Partially Updated Title' };
      
      const response = await request(app)
        .patch('/api/albums/1')
        .send(partialUpdate)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('title', partialUpdate.title);
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .patch('/api/albums/999')
        .send({ title: 'Test' })
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'Not found');
    });
  });

  describe('DELETE /api/albums/:id', () => {
    it('should delete an existing album', async () => {
      // First create an album to delete
      const newAlbum = {
        title: 'Album to Delete',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Test'
      };
      
      const createResponse = await request(app)
        .post('/api/albums')
        .send(newAlbum);
      
      const albumId = createResponse.body.data.id;
      
      const response = await request(app)
        .delete(`/api/albums/${albumId}`)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.message).toContain('deleted successfully');
      
      // Verify album is deleted
      await request(app)
        .get(`/api/albums/${albumId}`)
        .expect(404);
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .delete('/api/albums/999')
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'Not found');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });
});
