const express = require('express');
const app = express();
app.use(express.json());

// In-memory album collection
let albums = [
  { id: 1, title: 'Abbey Road', artist: 'The Beatles', year: 1969 },
  { id: 2, title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
  { id: 3, title: 'Back in Black', artist: 'AC/DC', year: 1980 }
];
let nextId = 4;

// List all albums
app.get('/albums', (req, res) => {
  res.json(albums);
});

// Get album by id
app.get('/albums/:id', (req, res) => {
  const album = albums.find(a => a.id === parseInt(req.params.id));
  if (!album) return res.status(404).json({ error: 'Album not found' });
  res.json(album);
});

// Add new album
app.post('/albums', (req, res) => {
  const { title, artist, year } = req.body;
  if (!title || !artist || !year) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const album = { id: nextId++, title, artist, year };
  albums.push(album);
  res.status(201).json(album);
});

// Update album
app.put('/albums/:id', (req, res) => {
  const album = albums.find(a => a.id === parseInt(req.params.id));
  if (!album) return res.status(404).json({ error: 'Album not found' });
  const { title, artist, year } = req.body;
  if (title) album.title = title;
  if (artist) album.artist = artist;
  if (year) album.year = year;
  res.json(album);
});

// Delete album
app.delete('/albums/:id', (req, res) => {
  const idx = albums.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Album not found' });
  const deleted = albums.splice(idx, 1);
  res.json(deleted[0]);
});

// Start server if not in test mode
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Album API listening on port ${port}`));
}

module.exports = app;
