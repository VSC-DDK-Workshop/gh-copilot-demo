// In-memory database
let albums = [
  {
    id: '1',
    title: 'Thriller',
    artist: 'Michael Jackson',
    year: 1982,
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'Back in Black',
    artist: 'AC/DC',
    year: 1980,
    genre: 'Rock'
  },
  {
    id: '3',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
    genre: 'Progressive Rock'
  }
];

module.exports = {
  getAll: () => albums,
  getById: (id) => albums.find(album => album.id === id),
  create: (album) => {
    const newAlbum = { ...album, id: String(albums.length + 1) };
    albums.push(newAlbum);
    return newAlbum;
  },
  update: (id, updatedAlbum) => {
    const index = albums.findIndex(album => album.id === id);
    if (index === -1) return null;
    albums[index] = { ...updatedAlbum, id };
    return albums[index];
  },
  delete: (id) => {
    const index = albums.findIndex(album => album.id === id);
    if (index === -1) return false;
    albums.splice(index, 1);
    return true;
  },
  // For testing purposes
  reset: () => {
    albums = [
      {
        id: '1',
        title: 'Thriller',
        artist: 'Michael Jackson',
        year: 1982,
        genre: 'Pop'
      },
      {
        id: '2',
        title: 'Back in Black',
        artist: 'AC/DC',
        year: 1980,
        genre: 'Rock'
      },
      {
        id: '3',
        title: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        year: 1973,
        genre: 'Progressive Rock'
      }
    ];
  }
};
