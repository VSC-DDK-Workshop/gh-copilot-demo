import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import express from 'express';
import appModule from '../index.js';

chai.use(chaiHttp);
const expect = chai.expect;

// Since index.js starts the server, we need to re-create the app for testing
let app;
before(async () => {
  app = express();
  app.use(express.json());
  // Copy routes from index.js
  // For simplicity, require the same file (in real projects, split routes)
  app = (await import('../index.js')).default || app;
});

describe('Album API', () => {
  it('should list all albums', async () => {
    const res = await chai.request('http://localhost:3001').get('/albums');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should get an album by id', async () => {
    const res = await chai.request('http://localhost:3001').get('/albums/1');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id', 1);
  });

  it('should add a new album', async () => {
    const newAlbum = { title: 'Test Album', artist: 'Test Artist', year: 2025 };
    const res = await chai.request('http://localhost:3001').post('/albums').send(newAlbum);
    expect(res).to.have.status(201);
    expect(res.body).to.include(newAlbum);
  });

  it('should update an album', async () => {
    const res = await chai.request('http://localhost:3001').put('/albums/1').send({ title: 'Updated Title' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('title', 'Updated Title');
  });

  it('should delete an album', async () => {
    const res = await chai.request('http://localhost:3001').delete('/albums/1');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id', 1);
  });
});
