const request = require('supertest');
const { expect } = require('chai');
const app = require('./index');

describe('Album API', () => {
  it('should list all albums', async () => {
    const res = await request(app).get('/albums');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  it('should get an album by id', async () => {
    const res = await request(app).get('/albums/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('title');
  });

  it('should return 404 for non-existent album', async () => {
    const res = await request(app).get('/albums/999');
    expect(res.status).to.equal(404);
  });

  it('should add a new album', async () => {
    const newAlbum = { title: 'Test Album', artist: 'Test Artist', year: 2025 };
    const res = await request(app).post('/albums').send(newAlbum);
    expect(res.status).to.equal(201);
    expect(res.body).to.include(newAlbum);
  });

  it('should update an album', async () => {
    const res = await request(app).put('/albums/1').send({ title: 'Updated Title' });
    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Updated Title');
  });

  it('should delete an album', async () => {
    const res = await request(app).delete('/albums/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', 1);
  });
});
