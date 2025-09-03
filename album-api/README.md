# Album API

A simple RESTful API for managing music albums.

## Features

- List all albums
- Get album by ID
- Create new albums
- Update existing albums
- Delete albums

## Setup

```bash
# Install dependencies
npm install

# Start the server
npm start

# Start with auto-restart on file changes
npm run dev

# Run tests
npm test
```

## API Endpoints

- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get album by ID
- `POST /api/albums` - Create a new album
- `PUT /api/albums/:id` - Update an album
- `DELETE /api/albums/:id` - Delete an album

## Data Model

Albums have the following properties:

```json
{
  "id": "string",
  "title": "string",
  "artist": "string",
  "year": number,
  "genre": "string",
  "tracks": number
}
```
