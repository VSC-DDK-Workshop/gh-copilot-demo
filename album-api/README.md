# Album API

A Node.js REST API for managing music albums with full CRUD operations.

## Features

- ✅ **Complete CRUD Operations**: Create, Read, Update, Delete albums
- ✅ **In-Memory Data Storage**: No database required for this demo
- ✅ **Input Validation**: Comprehensive validation using express-validator
- ✅ **Error Handling**: Proper error responses and status codes
- ✅ **Filtering & Search**: Search by title, artist, genre, or year
- ✅ **Security**: Helmet.js for security headers
- ✅ **CORS Support**: Cross-origin resource sharing enabled
- ✅ **Comprehensive Testing**: Unit tests with Jest and Supertest
- ✅ **Request Logging**: Morgan middleware for HTTP request logging

## Quick Start

### Installation

```bash
cd album-api
npm install
```

### Running the API

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints

### Base Information

- **GET /** - API information and available endpoints
- **GET /health** - Health check endpoint

### Album Management

| Method | Endpoint | Description | Body Required |
|--------|----------|-------------|---------------|
| GET | `/api/albums` | Get all albums (with optional filtering) | No |
| GET | `/api/albums/:id` | Get album by ID | No |
| POST | `/api/albums` | Create new album | Yes |
| PUT | `/api/albums/:id` | Update album by ID | Yes |
| DELETE | `/api/albums/:id` | Delete album by ID | No |

### Query Parameters

- **GET /api/albums?search={term}** - Search albums by title, artist, or genre
- **GET /api/albums?genre={genre}** - Filter albums by genre
- **GET /api/albums?year={year}** - Filter albums by year

## Data Model

### Album Object

```json
{
  "id": 1,
  "title": "Album Title",
  "artist": "Artist Name",
  "year": 2023,
  "genre": "Genre",
  "tracks": 10,
  "duration": "45:30",
  "label": "Record Label",
  "description": "Album description",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

### Required Fields

- `title` (string, 1-200 characters)
- `artist` (string, 1-200 characters)  
- `year` (integer, 1900 to current year + 1)
- `genre` (string, 1-100 characters)

### Optional Fields

- `tracks` (integer, 1-100)
- `duration` (string, format: "MM:SS" or "MMM:SS")
- `label` (string, max 200 characters)
- `description` (string, max 1000 characters)

## Example Usage

### Create an Album

```bash
curl -X POST http://localhost:3000/api/albums \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Album",
    "artist": "Great Artist",
    "year": 2023,
    "genre": "Rock",
    "tracks": 12,
    "duration": "48:30",
    "label": "Cool Records",
    "description": "An amazing new album"
  }'
```

### Get All Albums

```bash
curl http://localhost:3000/api/albums
```

### Search Albums

```bash
curl "http://localhost:3000/api/albums?search=rock"
curl "http://localhost:3000/api/albums?genre=Pop"
curl "http://localhost:3000/api/albums?year=1982"
```

### Update an Album

```bash
curl -X PUT http://localhost:3000/api/albums/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Album Title",
    "artist": "Updated Artist",
    "year": 2024,
    "genre": "Jazz"
  }'
```

### Delete an Album

```bash
curl -X DELETE http://localhost:3000/api/albums/1
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* result data */ },
  "count": 5  // Only for list operations
}
```

### Error Response

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "details": [  // Only for validation errors
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## Sample Data

The API comes pre-loaded with 6 sample albums:

1. **Thriller** - Michael Jackson (1982, Pop)
2. **Back in Black** - AC/DC (1980, Hard Rock)
3. **The Dark Side of the Moon** - Pink Floyd (1973, Progressive Rock)
4. **Abbey Road** - The Beatles (1969, Rock)
5. **Rumours** - Fleetwood Mac (1977, Rock)
6. **Good Kid, M.A.A.D City** - Kendrick Lamar (2012, Hip Hop)

## Testing

The API includes comprehensive tests for:

- ✅ All CRUD operations
- ✅ Input validation
- ✅ Error handling
- ✅ Search and filtering functionality
- ✅ Data store operations
- ✅ Edge cases and error scenarios

Test coverage includes both API endpoints and the data store layer.

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **express-validator** - Input validation
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logging
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library

## Workshop Context

This API was created as part of the GitHub Copilot Workshop demonstrating:
- AI-assisted code generation
- Best practices for Node.js APIs
- Comprehensive testing strategies
- Proper error handling and validation
