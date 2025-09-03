const request = require('supertest');
const app = require('../src/server');
const albumStore = require('../src/models/albumStore');

describe('Album API', () => {
  beforeEach(() => {
    albumStore.reset();
  });

  describe('GET /api/albums', () => {
    it('should return all albums', async () => {
      const res = await request(app).get('/api/albums');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body[0].title).toBe('Thriller');
    });
  });

  describe('GET /api/albums/:id', () => {
    it('should return album by id', async () => {
      const res = await request(app).get('/api/albums/1');
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Thriller');
    });

    it('should return 404 for non-existent album', async () => {
      const res = await request(app).get('/api/albums/999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/albums', () => {
    it('should create a new album', async () => {
      const newAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2023,
        genre: 'Test Genre'
      };

      const res = await request(app)
        .post('/api/albums')
        .send(newAlbum);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe(newAlbum.title);
      expect(res.body.id).toBe('4');
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/api/albums')
        .send({ artist: 'Test Artist' });

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/albums/:id', () => {
    it('should update an existing album', async () => {
      const updatedAlbum = {
        title: 'Updated Thriller',
        artist: 'Michael Jackson',
        year: 1982,
        genre: 'Pop'
      };

      const res = await request(app)
        .put('/api/albums/1')
        .send(updatedAlbum);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(updatedAlbum.title);
    });

    it('should return 404 for non-existent album', async () => {
      const res = await request(app)
        .put('/api/albums/999')
        .send({
          title: 'Test',
          artist: 'Test'
        });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/albums/:id', () => {
    it('should delete an existing album', async () => {
      const res = await request(app).delete('/api/albums/1');
      expect(res.status).toBe(204);

      const getRes = await request(app).get('/api/albums/1');
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent album', async () => {
      const res = await request(app).delete('/api/albums/999');
      expect(res.status).toBe(404);
    });
  });
});
