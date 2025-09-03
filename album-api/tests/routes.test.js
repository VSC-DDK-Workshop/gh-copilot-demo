const request = require('supertest');
const app = require('../app');

describe('Album API Routes', () => {
  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message', 'Album API is running');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/albums', () => {
    test('should return all albums', async () => {
      const response = await request(app)
        .get('/api/albums')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.count).toBeDefined();
    });

    test('should filter albums by search query', async () => {
      const response = await request(app)
        .get('/api/albums?search=thriller')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].title.toLowerCase()).toContain('thriller');
    });

    test('should filter albums by genre', async () => {
      const response = await request(app)
        .get('/api/albums?genre=rock')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      if (response.body.data.length > 0) {
        expect(response.body.data[0].genre.toLowerCase()).toBe('rock');
      }
    });

    test('should filter albums by artist', async () => {
      const response = await request(app)
        .get('/api/albums?artist=Michael Jackson')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      if (response.body.data.length > 0) {
        expect(response.body.data[0].artist).toBe('Michael Jackson');
      }
    });
  });

  describe('GET /api/albums/:id', () => {
    test('should return album by ID', async () => {
      const response = await request(app)
        .get('/api/albums/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('artist');
    });

    test('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .get('/api/albums/999')
        .expect(404);

      expect(response.body.error).toBe('Not Found');
      expect(response.body.message).toBe('Album not found');
    });

    test('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .get('/api/albums/invalid')
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('POST /api/albums', () => {
    test('should create new album with valid data', async () => {
      const newAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Test Genre',
        tracks: ['Track 1', 'Track 2']
      };

      const response = await request(app)
        .post('/api/albums')
        .send(newAlbum)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(newAlbum.title);
      expect(response.body.data.artist).toBe(newAlbum.artist);
      expect(response.body.data.tracks).toEqual(newAlbum.tracks);
    });

    test('should create album without tracks', async () => {
      const newAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Test Genre'
      };

      const response = await request(app)
        .post('/api/albums')
        .send(newAlbum)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.tracks).toEqual([]);
    });

    test('should return 400 for missing required fields', async () => {
      const incompleteAlbum = {
        title: 'Test Album'
        // Missing artist, year, genre
      };

      const response = await request(app)
        .post('/api/albums')
        .send(incompleteAlbum)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
      expect(response.body.details).toBeInstanceOf(Array);
    });

    test('should return 400 for invalid year', async () => {
      const invalidAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 1800,
        genre: 'Test Genre'
      };

      const response = await request(app)
        .post('/api/albums')
        .send(invalidAlbum)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('PUT /api/albums/:id', () => {
    test('should update existing album', async () => {
      const updateData = {
        title: 'Updated Title',
        genre: 'Updated Genre'
      };

      const response = await request(app)
        .put('/api/albums/1')
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.genre).toBe(updateData.genre);
    });

    test('should return 404 for non-existent album', async () => {
      const updateData = { title: 'Updated Title' };

      const response = await request(app)
        .put('/api/albums/999')
        .send(updateData)
        .expect(404);

      expect(response.body.error).toBe('Not Found');
    });

    test('should return 400 for invalid update data', async () => {
      const invalidUpdate = { title: '' };

      const response = await request(app)
        .put('/api/albums/1')
        .send(invalidUpdate)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });

    test('should return 400 for invalid ID', async () => {
      const updateData = { title: 'Updated Title' };

      const response = await request(app)
        .put('/api/albums/invalid')
        .send(updateData)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('DELETE /api/albums/:id', () => {
    test('should delete existing album', async () => {
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

    test('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .delete('/api/albums/999')
        .expect(404);

      expect(response.body.error).toBe('Not Found');
    });

    test('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .delete('/api/albums/invalid')
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('404 handler', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body.error).toBe('Not Found');
      expect(response.body.message).toContain('Route /api/unknown not found');
    });
  });
});
