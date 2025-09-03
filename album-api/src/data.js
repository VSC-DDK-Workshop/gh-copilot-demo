// In-memory album collection with sample data
// Each album: { id: string, title: string, artist: string, year: number, genre: string }

import { randomUUID } from 'crypto';

const albums = [
  { id: randomUUID(), title: 'Kind of Blue', artist: 'Miles Davis', year: 1959, genre: 'Jazz' },
  { id: randomUUID(), title: 'Abbey Road', artist: 'The Beatles', year: 1969, genre: 'Rock' },
  { id: randomUUID(), title: 'Thriller', artist: 'Michael Jackson', year: 1982, genre: 'Pop' }
];

export function listAlbums() {
  return [...albums];
}

export function getAlbum(id) {
  return albums.find(a => a.id === id) || null;
}

export function addAlbum({ title, artist, year, genre }) {
  const album = { id: randomUUID(), title, artist, year, genre };
  albums.push(album);
  return album;
}

export function updateAlbum(id, { title, artist, year, genre }) {
  const idx = albums.findIndex(a => a.id === id);
  if (idx === -1) return null;
  albums[idx] = { ...albums[idx], title, artist, year, genre };
  return albums[idx];
}

export function deleteAlbum(id) {
  const idx = albums.findIndex(a => a.id === id);
  if (idx === -1) return false;
  albums.splice(idx, 1);
  return true;
}
