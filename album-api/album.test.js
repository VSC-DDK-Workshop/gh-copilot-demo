const request = require('supertest');
const express = require('express');

let app;
let server;

beforeAll(() => {
  app = require('./index');
  server = app.listen(4000);
});

afterAll(done => {
  server.close(done);
});

describe('Album API', () => {
  it('should list all albums', async () => {
    const res = await request(server).get('/albums');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get an album by id', async () => {
    const res = await request(server).get('/albums/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBeDefined();
  });

  it('should add a new album', async () => {
    const newAlbum = { title: 'Test Album', artist: 'Test Artist', year: 2025 };
    const res = await request(server).post('/albums').send(newAlbum);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Album');
  });

  it('should update an album', async () => {
    const res = await request(server).put('/albums/1').send({ title: 'Updated Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should delete an album', async () => {
    const res = await request(server).delete('/albums/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });
});
