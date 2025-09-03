import request from 'supertest';
import app from '../src/app.js';
import { listAlbums } from '../src/data.js';
import { strict as assert } from 'assert';

describe('Album API', () => {
  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
  });

  it('GET /albums returns list', async () => {
    const res = await request(app).get('/albums');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length >= 3);
  });

  it('POST /albums creates new album', async () => {
    const payload = { title: 'Test Album', artist: 'Tester', year: 2024, genre: 'Test' };
    const res = await request(app).post('/albums').send(payload);
    assert.equal(res.status, 201);
    assert.equal(res.body.title, payload.title);
  });

  it('POST /albums invalid payload returns 400', async () => {
    const res = await request(app).post('/albums').send({ title: 'No Year' });
    assert.equal(res.status, 400);
  });

  it('GET /albums/:id returns single', async () => {
    const first = listAlbums()[0];
    const res = await request(app).get(`/albums/${first.id}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.id, first.id);
  });

  it('GET /albums/:id 404 for missing', async () => {
    const res = await request(app).get('/albums/does-not-exist');
    assert.equal(res.status, 404);
  });

  it('PUT /albums/:id updates album', async () => {
    const first = listAlbums()[0];
    const res = await request(app).put(`/albums/${first.id}`).send({ title: 'Updated', artist: first.artist, year: first.year, genre: first.genre });
    assert.equal(res.status, 200);
    assert.equal(res.body.title, 'Updated');
  });

  it('PUT /albums/:id returns 404 when not found', async () => {
    const res = await request(app).put('/albums/does-not-exist').send({ title: 'X', artist: 'Y', year: 2020, genre: 'Z' });
    assert.equal(res.status, 404);
  });

  it('DELETE /albums/:id removes album', async () => {
    // create one first
    const create = await request(app).post('/albums').send({ title: 'DelMe', artist: 'Temp', year: 2023, genre: 'Misc' });
    const id = create.body.id;
    const del = await request(app).delete(`/albums/${id}`);
    assert.equal(del.status, 204);
  });

  it('DELETE /albums/:id 404 for missing', async () => {
    const res = await request(app).delete('/albums/does-not-exist');
    assert.equal(res.status, 404);
  });
});
