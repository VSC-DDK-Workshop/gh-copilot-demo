const express = require('express');
const app = express();
app.use(express.json());

// In-memory album collection
let albums = [
  { id: 1, title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
  { id: 2, title: 'Back in Black', artist: 'AC/DC', year: 1980 },
  { id: 3, title: 'Rumours', artist: 'Fleetwood Mac', year: 1977 }
];

// List all albums
app.get('/albums', (req, res) => {
  res.json(albums);
});

// Get album by ID
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
  const newAlbum = {
    id: albums.length ? Math.max(...albums.map(a => a.id)) + 1 : 1,
    title,
    artist,
    year
  };
  albums.push(newAlbum);
  res.status(201).json(newAlbum);
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
  const index = albums.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Album not found' });
  const deleted = albums.splice(index, 1);
  res.json(deleted[0]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Album API listening on port ${PORT}`);
});
