# Album API

A RESTful Node.js API for managing music albums with full CRUD operations.

## Features

- ✅ Create, Read, Update, Delete albums
- ✅ Input validation with express-validator
- ✅ Security headers with Helmet
- ✅ CORS support
- ✅ Comprehensive unit tests with Jest
- ✅ In-memory data storage
- ✅ Error handling and validation

## API Endpoints

### Base URL: `http://localhost:3001`

### Health Check
- `GET /health` - Returns API health status

### Albums
- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get album by ID
- `POST /api/albums` - Create new album
- `PUT /api/albums/:id` - Update album by ID
- `DELETE /api/albums/:id` - Delete album by ID

## Album Schema

```json
{
  "id": 1,
  "title": "Album Title",
  "artist": "Artist Name", 
  "year": 2023,
  "genre": "Genre (optional)",
  "duration": 45,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Sample Data

The API comes with 5 sample albums:
1. Thriller - Michael Jackson (1982)
2. Back in Black - AC/DC (1980)
3. The Dark Side of the Moon - Pink Floyd (1973)
4. Abbey Road - The Beatles (1969)
5. Kind of Blue - Miles Davis (1959)

## API Usage Examples

### Get All Albums
```bash
curl http://localhost:3001/api/albums
```

### Create New Album
```bash
curl -X POST http://localhost:3001/api/albums \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Album",
    "artist": "New Artist",
    "year": 2023,
    "genre": "Rock",
    "duration": 45
  }'
```

### Update Album
```bash
curl -X PUT http://localhost:3001/api/albums/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "artist": "Updated Artist", 
    "year": 2023
  }'
```

### Delete Album
```bash
curl -X DELETE http://localhost:3001/api/albums/1
```

## Testing

The API includes comprehensive unit tests covering:
- All CRUD operations
- Validation scenarios
- Error handling
- Edge cases

Run tests with:
```bash
npm test
```

## Security Features

- **Helmet.js**: Security headers
- **Input Validation**: Request validation with express-validator
- **Error Handling**: Proper error responses without sensitive data leakage
- **CORS**: Cross-origin resource sharing support

## Development

This project follows the company's coding standards:
- ✅ Input validation on all endpoints
- ✅ Proper error handling with try-catch blocks
- ✅ Security headers and CORS protection
- ✅ Comprehensive testing coverage
- ✅ Clear API documentation
