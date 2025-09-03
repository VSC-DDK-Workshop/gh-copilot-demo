# Album API

A Node.js REST API for managing music albums with full CRUD operations, built with Express.js.

## Features

- 🎵 Full CRUD operations for albums
- 🔍 Advanced filtering (artist, genre, year, rating)
- 📊 Statistics endpoint
- ✅ Input validation with express-validator
- 🔒 Security headers with Helmet
- 🌐 CORS enabled
- 📝 Comprehensive logging
- 🧪 100% test coverage
- 📚 In-memory data store with sample albums

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Start in development mode with auto-reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints

### Health Check
- `GET /health` - API health status

### Albums
- `GET /api/albums` - Get all albums (with optional filtering)
- `GET /api/albums/stats` - Get album statistics
- `GET /api/albums/:id` - Get specific album
- `POST /api/albums` - Create new album
- `PUT /api/albums/:id` - Update album (full update)
- `PATCH /api/albums/:id` - Update album (partial update)
- `DELETE /api/albums/:id` - Delete album

## Query Parameters

When getting all albums, you can filter using:

- `artist` - Filter by artist name (case-insensitive partial match)
- `genre` - Filter by genre (case-insensitive partial match)
- `year` - Filter by exact year
- `minRating` - Filter by minimum rating (1-5)

Example: `GET /api/albums?artist=Michael&genre=Pop&minRating=4`

## Request/Response Examples

### Get All Albums
```bash
curl http://localhost:3001/api/albums
```

Response:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "Thriller",
      "artist": "Michael Jackson",
      "year": 1982,
      "genre": "Pop",
      "tracks": ["Wanna Be Startin' Somethin'", "Baby Be Mine", "..."],
      "coverUrl": "https://example.com/covers/thriller.jpg",
      "rating": 5,
      "createdAt": "2023-01-15T10:30:00.000Z",
      "updatedAt": "2023-01-15T10:30:00.000Z"
    }
  ],
  "filters": {}
}
```

### Create New Album
```bash
curl -X POST http://localhost:3001/api/albums \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Abbey Road",
    "artist": "The Beatles",
    "year": 1969,
    "genre": "Rock",
    "tracks": ["Come Together", "Something", "..."],
    "rating": 5
  }'
```

Response:
```json
{
  "success": true,
  "message": "Album created successfully",
  "data": {
    "id": 6,
    "title": "Abbey Road",
    "artist": "The Beatles",
    "year": 1969,
    "genre": "Rock",
    "tracks": ["Come Together", "Something", "..."],
    "coverUrl": "",
    "rating": 5,
    "createdAt": "2024-09-03T12:00:00.000Z",
    "updatedAt": "2024-09-03T12:00:00.000Z"
  }
}
```

### Get Statistics
```bash
curl http://localhost:3001/api/albums/stats
```

Response:
```json
{
  "success": true,
  "data": {
    "totalAlbums": 5,
    "totalArtists": 5,
    "totalGenres": 5,
    "totalTracks": 53,
    "averageRating": 4.8,
    "genres": ["Pop", "Progressive Rock", "Soul", "Rock", "Hip Hop"],
    "artists": ["Michael Jackson", "Pink Floyd", "Amy Winehouse", "The Beatles", "Kendrick Lamar"]
  }
}
```

## Album Schema

```javascript
{
  id: Number,           // Auto-generated unique ID
  title: String,        // Required, 1-200 characters
  artist: String,       // Required, 1-100 characters
  year: Number,         // Required, 1900 to current year + 1
  genre: String,        // Required, 1-50 characters
  tracks: Array,        // Optional, array of track names
  coverUrl: String,     // Optional, valid URL
  rating: Number,       // Optional, 1-5 (default: 3)
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-updated
}
```

## Error Responses

The API returns consistent error responses:

```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

For validation errors:
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required and must be between 1 and 200 characters",
      "value": ""
    }
  ]
}
```

## Sample Data

The API comes with 5 sample albums:
1. Thriller - Michael Jackson (1982)
2. The Dark Side of the Moon - Pink Floyd (1973)
3. Back to Black - Amy Winehouse (2006)
4. Abbey Road - The Beatles (1969)
5. Good Kid, M.A.A.D City - Kendrick Lamar (2012)

## Testing

Run the test suite:
```bash
npm test
```

The tests cover:
- All API endpoints
- Data layer functions
- Error handling
- Input validation
- Edge cases

## Security Features

- **Helmet**: Security headers
- **Input Validation**: All inputs validated with express-validator
- **CORS**: Cross-origin resource sharing enabled
- **Error Handling**: No sensitive data exposed in errors

## Development

The API uses:
- **Express.js** - Web framework
- **express-validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin support
- **Morgan** - HTTP logging
- **Jest** - Testing framework
- **Supertest** - HTTP testing

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

---

Built with ❤️ for the VS Code Dev Days Workshop in Nairobi 🇰🇪
