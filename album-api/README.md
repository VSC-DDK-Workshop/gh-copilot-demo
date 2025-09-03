# Album API

Simple Node.js/Express in-memory API to manage music albums.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /albums | List all albums |
| GET | /albums/:id | Get album by id |
| POST | /albums | Create new album |
| PUT | /albums/:id | Update album |
| DELETE | /albums/:id | Delete album |

## Sample Album Object
```json
{
  "id": "uuid",
  "title": "Kind of Blue",
  "artist": "Miles Davis",
  "year": 1959,
  "genre": "Jazz"
}
```

## Running
```bash
npm install
npm start
```

## Testing
```bash
npm test
```

## Notes
- Data is stored in-memory (lost on restart).
- Year validation ensures plausible release years.
