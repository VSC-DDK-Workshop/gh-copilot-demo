const request = require('supertest');
const app = require('../app');

describe('Album API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('message', 'Album API is running');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/albums', () => {
    it('should return all albums', async () => {
      const res = await request(app)
        .get('/api/albums')
        .expect(200);
      
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('count');
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should filter albums by artist', async () => {
      const res = await request(app)
        .get('/api/albums?artist=Beatles')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(0);
      
      if (res.body.data.length > 0) {
        res.body.data.forEach(album => {
          expect(album.artist.toLowerCase()).toContain('beatles');
        });
      }
    });

    it('should filter albums by genre', async () => {
      const res = await request(app)
        .get('/api/albums?genre=Rock')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(0);
      
      if (res.body.data.length > 0) {
        res.body.data.forEach(album => {
          expect(album.genre.toLowerCase()).toContain('rock');
        });
      }
    });

    it('should filter albums by year', async () => {
      const res = await request(app)
        .get('/api/albums?year=1969')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(0);
      
      if (res.body.data.length > 0) {
        res.body.data.forEach(album => {
          expect(album.year).toBe(1969);
        });
      }
    });
  });

  describe('GET /api/albums/:id', () => {
    let albumId;

    beforeAll(async () => {
      // Get an existing album ID
      const res = await request(app).get('/api/albums');
      if (res.body.data.length > 0) {
        albumId = res.body.data[0].id;
      }
    });

    it('should return a specific album by ID', async () => {
      if (!albumId) {
        pending('No albums available for testing');
        return;
      }

      const res = await request(app)
        .get(`/api/albums/${albumId}`)
        .expect(200);
      
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id', albumId);
      expect(res.body.data).toHaveProperty('title');
      expect(res.body.data).toHaveProperty('artist');
      expect(res.body.data).toHaveProperty('year');
      expect(res.body.data).toHaveProperty('genre');
    });

    it('should return 404 for non-existent album', async () => {
      const res = await request(app)
        .get('/api/albums/non-existent-id')
        .expect(404);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error', 'Album not found');
    });
  });

  describe('POST /api/albums', () => {
    it('should create a new album with valid data', async () => {
      const newAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2024,
        genre: 'Test Genre',
        tracks: ['Track 1', 'Track 2', 'Track 3']
      };

      const res = await request(app)
        .post('/api/albums')
        .send(newAlbum)
        .expect(201);
      
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Album created successfully');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('title', newAlbum.title);
      expect(res.body.data).toHaveProperty('artist', newAlbum.artist);
      expect(res.body.data).toHaveProperty('year', newAlbum.year);
      expect(res.body.data).toHaveProperty('genre', newAlbum.genre);
      expect(res.body.data).toHaveProperty('tracks');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing title', async () => {
      const invalidAlbum = {
        artist: 'Test Artist',
        year: 2024,
        genre: 'Test Genre'
      };

      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error', 'Validation failed');
      expect(res.body.details).toContain('Title is required and cannot be empty');
    });

    it('should return 400 for missing artist', async () => {
      const invalidAlbum = {
        title: 'Test Album',
        year: 2024,
        genre: 'Test Genre'
      };

      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.details).toContain('Artist is required and cannot be empty');
    });

    it('should return 400 for invalid year', async () => {
      const invalidAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 'invalid-year',
        genre: 'Test Genre'
      };

      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.details).toContain('Year must be a valid integer between 1900 and current year');
    });

    it('should return 400 for year out of range', async () => {
      const invalidAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 1800,
        genre: 'Test Genre'
      };

      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.details).toContain('Year must be a valid integer between 1900 and current year');
    });

    it('should return 400 for missing genre', async () => {
      const invalidAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2024
      };

      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.details).toContain('Genre is required and cannot be empty');
    });
  });

  describe('PUT /api/albums/:id', () => {
    let albumId;

    beforeEach(async () => {
      // Create a test album
      const newAlbum = {
        title: 'Update Test Album',
        artist: 'Update Test Artist',
        year: 2024,
        genre: 'Update Test Genre',
        tracks: ['Track 1', 'Track 2']
      };

      const res = await request(app)
        .post('/api/albums')
        .send(newAlbum);
      
      albumId = res.body.data.id;
    });

    it('should update an existing album', async () => {
      const updatedData = {
        title: 'Updated Album Title',
        artist: 'Updated Artist Name',
        year: 2023,
        genre: 'Updated Genre',
        tracks: ['New Track 1', 'New Track 2', 'New Track 3']
      };

      const res = await request(app)
        .put(`/api/albums/${albumId}`)
        .send(updatedData)
        .expect(200);
      
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Album updated successfully');
      expect(res.body.data).toHaveProperty('id', albumId);
      expect(res.body.data).toHaveProperty('title', updatedData.title);
      expect(res.body.data).toHaveProperty('artist', updatedData.artist);
      expect(res.body.data).toHaveProperty('year', updatedData.year);
      expect(res.body.data).toHaveProperty('genre', updatedData.genre);
      expect(res.body.data.tracks).toEqual(updatedData.tracks);
    });

    it('should return 404 for non-existent album', async () => {
      const updatedData = {
        title: 'Updated Album Title',
        artist: 'Updated Artist Name',
        year: 2023,
        genre: 'Updated Genre'
      };

      const res = await request(app)
        .put('/api/albums/non-existent-id')
        .send(updatedData)
        .expect(404);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error', 'Album not found');
    });

    it('should return 400 for invalid update data', async () => {
      const invalidData = {
        title: '',
        artist: 'Updated Artist Name',
        year: 2023,
        genre: 'Updated Genre'
      };

      const res = await request(app)
        .put(`/api/albums/${albumId}`)
        .send(invalidData)
        .expect(400);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error', 'Validation failed');
    });
  });

  describe('DELETE /api/albums/:id', () => {
    let albumId;

    beforeEach(async () => {
      // Create a test album
      const newAlbum = {
        title: 'Delete Test Album',
        artist: 'Delete Test Artist',
        year: 2024,
        genre: 'Delete Test Genre'
      };

      const res = await request(app)
        .post('/api/albums')
        .send(newAlbum);
      
      albumId = res.body.data.id;
    });

    it('should delete an existing album', async () => {
      const res = await request(app)
        .delete(`/api/albums/${albumId}`)
        .expect(200);
      
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Album deleted successfully');
      expect(res.body.data).toHaveProperty('id', albumId);

      // Verify album is deleted
      await request(app)
        .get(`/api/albums/${albumId}`)
        .expect(404);
    });

    it('should return 404 for non-existent album', async () => {
      const res = await request(app)
        .delete('/api/albums/non-existent-id')
        .expect(404);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error', 'Album not found');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app)
        .get('/api/unknown-route')
        .expect(404);
      
      expect(res.body).toHaveProperty('error', 'Route not found');
    });
  });
});
