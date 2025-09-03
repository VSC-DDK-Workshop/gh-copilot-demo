# Album API

A RESTful Node.js API for managing music albums built with Express.js.

## Features

- **CRUD Operations**: Create, Read, Update, Delete albums
- **Search Functionality**: Search albums by title, artist, or genre
- **Filtering**: Filter albums by genre or artist
- **Validation**: Input validation with detailed error messages
- **In-Memory Storage**: Data stored in memory (no database required)
- **Sample Data**: Pre-loaded with 5 sample albums
- **Unit Tests**: Comprehensive test coverage with Jest
- **API Documentation**: Well-documented endpoints

## Quick Start

### Installation

```bash
cd album-api
npm install
```

### Development

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints

### Base URL
```
http://localhost:3001
```

### Health Check
- **GET** `/health` - Check API health status

### Albums

#### Get All Albums
- **GET** `/api/albums`
- **Query Parameters:**
  - `search` - Search by title, artist, or genre
  - `genre` - Filter by genre
  - `artist` - Filter by artist

**Example:**
```bash
curl http://localhost:3001/api/albums
curl http://localhost:3001/api/albums?search=thriller
curl http://localhost:3001/api/albums?genre=rock
curl http://localhost:3001/api/albums?artist=Michael%20Jackson
```

#### Get Album by ID
- **GET** `/api/albums/:id`

**Example:**
```bash
curl http://localhost:3001/api/albums/1
```

#### Create New Album
- **POST** `/api/albums`
- **Body:** JSON object with album data

**Required Fields:**
- `title` (string) - Album title
- `artist` (string) - Artist name
- `year` (integer) - Release year (1900 - current year)
- `genre` (string) - Music genre

**Optional Fields:**
- `tracks` (array) - List of track names

**Example:**
```bash
curl -X POST http://localhost:3001/api/albums \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Album",
    "artist": "New Artist",
    "year": 2023,
    "genre": "Pop",
    "tracks": ["Track 1", "Track 2"]
  }'
```

#### Update Album
- **PUT** `/api/albums/:id`
- **Body:** JSON object with fields to update

**Example:**
```bash
curl -X PUT http://localhost:3001/api/albums/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "genre": "Updated Genre"
  }'
```

#### Delete Album
- **DELETE** `/api/albums/:id`

**Example:**
```bash
curl -X DELETE http://localhost:3001/api/albums/1
```

## Sample Data

The API comes pre-loaded with 5 sample albums:

1. **Thriller** - Michael Jackson (1982, Pop)
2. **The Dark Side of the Moon** - Pink Floyd (1973, Progressive Rock)
3. **Abbey Road** - The Beatles (1969, Rock)
4. **Back to Black** - Amy Winehouse (2006, Soul)
5. **Random Access Memories** - Daft Punk (2013, Electronic)

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "error": "Error Type",
  "message": "Error description",
  "details": [ ... ] // For validation errors
}
```

## Album Object Structure

```json
{
  "id": 1,
  "title": "Album Title",
  "artist": "Artist Name",
  "year": 2023,
  "genre": "Genre",
  "tracks": ["Track 1", "Track 2"],
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Testing

The API includes comprehensive unit tests covering:

- **Model Tests**: Album model validation and methods
- **Service Tests**: Album service CRUD operations and search functionality
- **Route Tests**: API endpoint behavior and error handling

Run tests with:
```bash
npm test
```

## Error Handling

The API provides detailed error responses for:

- **400 Bad Request**: Invalid input data or validation errors
- **404 Not Found**: Album not found or invalid routes
- **500 Internal Server Error**: Server-side errors

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing enabled
- **Input Validation**: Comprehensive input validation and sanitization

## Dependencies

- **express**: Web framework
- **cors**: CORS middleware
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **express-validator**: Input validation

## Development Dependencies

- **jest**: Testing framework
- **supertest**: HTTP testing
- **nodemon**: Development auto-reload

## Architecture

```
album-api/
├── app.js              # Main application file
├── models/
│   └── Album.js        # Album model with validation
├── services/
│   └── albumService.js # Business logic and data management
├── routes/
│   └── albums.js       # API route handlers
├── tests/
│   ├── Album.test.js   # Model tests
│   ├── albumService.test.js  # Service tests
│   └── routes.test.js  # Route/API tests
└── package.json        # Dependencies and scripts
```
