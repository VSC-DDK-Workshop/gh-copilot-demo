const request = require('supertest');
const { app, server } = require('../server');
const AlbumStore = require('../data/albumStore');

describe('Album API', () => {
  beforeEach(() => {
    // Reset the album store before each test
    AlbumStore.reset();
  });

  afterAll((done) => {
    // Close the server after all tests
    server.close(done);
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const res = await request(app).get('/');
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Welcome to the Album API');
      expect(res.body.version).toBe('1.0.0');
      expect(res.body.endpoints).toBeDefined();
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.message).toBe('Album API is running');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/albums', () => {
    it('should get all albums', async () => {
      const res = await request(app).get('/api/albums');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].title).toBe('Thriller');
    });

    it('should search albums by title', async () => {
      const res = await request(app).get('/api/albums?search=Thriller');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].title).toBe('Thriller');
    });

    it('should filter albums by genre', async () => {
      const res = await request(app).get('/api/albums?genre=Pop');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].genre).toBe('Pop');
    });

    it('should filter albums by year', async () => {
      const res = await request(app).get('/api/albums?year=1982');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].year).toBe(1982);
    });
  });

  describe('GET /api/albums/:id', () => {
    it('should get album by ID', async () => {
      const res = await request(app).get('/api/albums/1');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(1);
      expect(res.body.data.title).toBe('Thriller');
    });

    it('should return 404 for non-existent album', async () => {
      const res = await request(app).get('/api/albums/999');
      
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Album not found');
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/albums/invalid');
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });
  });

  describe('POST /api/albums', () => {
    const validAlbum = {
      title: 'Test Album',
      artist: 'Test Artist',
      year: 2023,
      genre: 'Rock',
      tracks: 10,
      duration: '45:30',
      label: 'Test Records',
      description: 'A test album'
    };

    it('should create a new album', async () => {
      const res = await request(app)
        .post('/api/albums')
        .send(validAlbum);
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Album created successfully');
      expect(res.body.data.id).toBe(2);
      expect(res.body.data.title).toBe('Test Album');
      expect(res.body.data.createdAt).toBeDefined();
      expect(res.body.data.updatedAt).toBeDefined();
    });

    it('should create album with minimal required fields', async () => {
      const minimalAlbum = {
        title: 'Minimal Album',
        artist: 'Minimal Artist',
        year: 2023,
        genre: 'Pop'
      };

      const res = await request(app)
        .post('/api/albums')
        .send(minimalAlbum);
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Minimal Album');
      expect(res.body.data.tracks).toBeNull();
    });

    it('should return 400 for missing required fields', async () => {
      const invalidAlbum = {
        title: 'Test Album'
        // Missing artist, year, genre
      };

      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum);
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
      expect(res.body.details).toHaveLength(3); // artist, year, genre missing
    });

    it('should return 400 for invalid year', async () => {
      const invalidAlbum = {
        ...validAlbum,
        year: 1800 // Too old
      };

      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum);
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });

    it('should return 400 for invalid duration format', async () => {
      const invalidAlbum = {
        ...validAlbum,
        duration: 'invalid'
      };

      const res = await request(app)
        .post('/api/albums')
        .send(invalidAlbum);
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });
  });

  describe('PUT /api/albums/:id', () => {
    const updatedAlbum = {
      title: 'Updated Album',
      artist: 'Updated Artist',
      year: 2024,
      genre: 'Jazz',
      tracks: 12,
      duration: '50:00',
      label: 'Updated Records',
      description: 'An updated album'
    };

    it('should update an existing album', async () => {
      const res = await request(app)
        .put('/api/albums/1')
        .send(updatedAlbum);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Album updated successfully');
      expect(res.body.data.id).toBe(1);
      expect(res.body.data.title).toBe('Updated Album');
      expect(res.body.data.updatedAt).toBeDefined();
    });

    it('should return 404 for non-existent album', async () => {
      const res = await request(app)
        .put('/api/albums/999')
        .send(updatedAlbum);
      
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Album not found');
    });

    it('should return 400 for invalid data', async () => {
      const invalidUpdate = {
        title: '', // Empty title
        artist: 'Test Artist',
        year: 2024,
        genre: 'Rock'
      };

      const res = await request(app)
        .put('/api/albums/1')
        .send(invalidUpdate);
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });
  });

  describe('DELETE /api/albums/:id', () => {
    it('should delete an existing album', async () => {
      const res = await request(app).delete('/api/albums/1');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Album with ID 1 deleted successfully');
    });

    it('should return 404 for non-existent album', async () => {
      const res = await request(app).delete('/api/albums/999');
      
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Album not found');
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).delete('/api/albums/invalid');
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });
  });

  describe('404 Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/api/nonexistent');
      
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Route not found');
    });
  });
});
