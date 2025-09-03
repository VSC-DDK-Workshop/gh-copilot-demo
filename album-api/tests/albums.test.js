const request = require('supertest');
const app = require('../app');
const albumsData = require('../data/albums');

describe('Album API', () => {
  beforeEach(() => {
    // Reset data before each test
    albumsData.resetData();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('Album API is running');
    });
  });

  describe('GET /api/albums', () => {
    it('should return all albums', async () => {
      const response = await request(app)
        .get('/api/albums')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(5);
      expect(response.body.count).toBe(5);
      expect(response.body.data[0]).toHaveProperty('id');
      expect(response.body.data[0]).toHaveProperty('title');
      expect(response.body.data[0]).toHaveProperty('artist');
    });
  });

  describe('GET /api/albums/:id', () => {
    it('should return a specific album', async () => {
      const response = await request(app)
        .get('/api/albums/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.title).toBe('Thriller');
      expect(response.body.data.artist).toBe('Michael Jackson');
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .get('/api/albums/999')
        .expect(404);

      expect(response.body.error).toBe('Album not found');
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/albums/invalid')
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('POST /api/albums', () => {
    it('should create a new album', async () => {
      const newAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Test Genre',
        duration: 45
      };

      const response = await request(app)
        .post('/api/albums')
        .send(newAlbum)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(newAlbum.title);
      expect(response.body.data.artist).toBe(newAlbum.artist);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('createdAt');
    });

    it('should create album without optional fields', async () => {
      const newAlbum = {
        title: 'Minimal Album',
        artist: 'Minimal Artist',
        year: 2023
      };

      const response = await request(app)
        .post('/api/albums')
        .send(newAlbum)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.genre).toBeNull();
      expect(response.body.data.duration).toBeNull();
    });

    it('should return 400 for missing required fields', async () => {
      const invalidAlbum = {
        title: 'Missing Artist'
      };

      const response = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: 'Artist is required'
          })
        ])
      );
    });

    it('should return 400 for invalid year', async () => {
      const invalidAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 1800 // Too old
      };

      const response = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('PUT /api/albums/:id', () => {
    it('should update an existing album', async () => {
      const updatedData = {
        title: 'Updated Thriller',
        artist: 'Michael Jackson',
        year: 1982,
        genre: 'Pop/Rock',
        duration: 45
      };

      const response = await request(app)
        .put('/api/albums/1')
        .send(updatedData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Updated Thriller');
      expect(response.body.data.genre).toBe('Pop/Rock');
      expect(response.body.data).toHaveProperty('updatedAt');
    });

    it('should return 404 for non-existent album', async () => {
      const updatedData = {
        title: 'Updated Album',
        artist: 'Updated Artist',
        year: 2023
      };

      const response = await request(app)
        .put('/api/albums/999')
        .send(updatedData)
        .expect(404);

      expect(response.body.error).toBe('Album not found');
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        title: '', // Empty title
        artist: 'Valid Artist',
        year: 2023
      };

      const response = await request(app)
        .put('/api/albums/1')
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('DELETE /api/albums/:id', () => {
    it('should delete an existing album', async () => {
      const response = await request(app)
        .delete('/api/albums/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Album deleted successfully');

      // Verify album is deleted
      await request(app)
        .get('/api/albums/1')
        .expect(404);
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .delete('/api/albums/999')
        .expect(404);

      expect(response.body.error).toBe('Album not found');
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .delete('/api/albums/invalid')
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body.error).toBe('Route not found');
    });
  });
});
