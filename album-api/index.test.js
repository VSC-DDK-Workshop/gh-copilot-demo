const request = require('supertest');
const app = require('./index');

describe('Album API', () => {
  it('should list all albums', async () => {
    const res = await request(app).get('/albums');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get an album by id', async () => {
    const res = await request(app).get('/albums/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
  });

  it('should return 404 for non-existent album', async () => {
    const res = await request(app).get('/albums/999');
    expect(res.statusCode).toBe(404);
  });

  it('should add a new album', async () => {
    const newAlbum = { title: 'Test Album', artist: 'Test Artist', year: 2025 };
    const res = await request(app).post('/albums').send(newAlbum);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(newAlbum);
  });

  it('should not add album with missing fields', async () => {
    const res = await request(app).post('/albums').send({ title: 'Incomplete' });
    expect(res.statusCode).toBe(400);
  });

  it('should update an album', async () => {
    const res = await request(app).put('/albums/1').send({ title: 'Updated Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should return 404 when updating non-existent album', async () => {
    const res = await request(app).put('/albums/999').send({ title: 'Nope' });
    expect(res.statusCode).toBe(404);
  });

  it('should delete an album', async () => {
    const res = await request(app).delete('/albums/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should return 404 when deleting non-existent album', async () => {
    const res = await request(app).delete('/albums/999');
    expect(res.statusCode).toBe(404);
  });
});
