import express from 'express';
import { listAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum } from './data.js';

const app = express();
app.use(express.json());

// Basic validation middleware
function validateAlbum(req, res, next) {
  const { title, artist, year, genre } = req.body;
  if (!title || !artist || !year || !genre) {
    return res.status(400).json({ error: 'Missing required fields: title, artist, year, genre' });
  }
  if (typeof year !== 'number' || year < 1880 || year > new Date().getFullYear() + 1) {
    return res.status(400).json({ error: 'Invalid year' });
  }
  next();
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/albums', (req, res) => {
  res.json(listAlbums());
});

app.get('/albums/:id', (req, res) => {
  const album = getAlbum(req.params.id);
  if (!album) return res.status(404).json({ error: 'Album not found' });
  res.json(album);
});

app.post('/albums', validateAlbum, (req, res) => {
  const album = addAlbum(req.body);
  res.status(201).json(album);
});

app.put('/albums/:id', validateAlbum, (req, res) => {
  const album = updateAlbum(req.params.id, req.body);
  if (!album) return res.status(404).json({ error: 'Album not found' });
  res.json(album);
});

app.delete('/albums/:id', (req, res) => {
  const removed = deleteAlbum(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Album not found' });
  res.status(204).send();
});

export default app;
