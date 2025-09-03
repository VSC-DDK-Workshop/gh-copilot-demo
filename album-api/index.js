const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

// In-memory album collection
let albums = [
  { id: 1, title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
  { id: 2, title: 'Back in Black', artist: 'AC/DC', year: 1980 },
  { id: 3, title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973 }
];

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
  const newAlbum = {
    id: albums.length ? albums[albums.length - 1].id + 1 : 1,
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

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Album API listening at http://localhost:${port}`);
  });
}

module.exports = app;
