/**
 * Validation middleware for album operations
 */

// Required fields for creating a new album
const REQUIRED_FIELDS = ['title', 'artist', 'genre', 'year'];

// Optional fields that can be included
const OPTIONAL_FIELDS = ['tracks', 'duration', 'label'];

// All allowed fields
const ALLOWED_FIELDS = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS];

/**
 * Validate album data for creation
 */
function validateAlbum(req, res, next) {
  const { body } = req;
  const errors = [];

  // Check if body exists
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Request body is required'
    });
  }

  // Check required fields
  REQUIRED_FIELDS.forEach(field => {
    if (!body[field]) {
      errors.push(`${field} is required`);
    }
  });

  // Validate field types and formats
  if (body.title && typeof body.title !== 'string') {
    errors.push('title must be a string');
  }

  if (body.artist && typeof body.artist !== 'string') {
    errors.push('artist must be a string');
  }

  if (body.genre && typeof body.genre !== 'string') {
    errors.push('genre must be a string');
  }

  if (body.year) {
    const year = parseInt(body.year);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      errors.push('year must be a valid number between 1900 and current year');
    }
  }

  if (body.tracks && !Array.isArray(body.tracks)) {
    errors.push('tracks must be an array');
  }

  if (body.duration && (typeof body.duration !== 'number' || body.duration < 0)) {
    errors.push('duration must be a positive number (in seconds)');
  }

  if (body.label && typeof body.label !== 'string') {
    errors.push('label must be a string');
  }

  // Check for unknown fields
  const unknownFields = Object.keys(body).filter(field => !ALLOWED_FIELDS.includes(field));
  if (unknownFields.length > 0) {
    errors.push(`Unknown fields: ${unknownFields.join(', ')}`);
  }

  // Additional business logic validation
  if (body.title && body.title.trim().length === 0) {
    errors.push('title cannot be empty');
  }

  if (body.artist && body.artist.trim().length === 0) {
    errors.push('artist cannot be empty');
  }

  if (body.tracks && body.tracks.length === 0) {
    errors.push('tracks array cannot be empty when provided');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid album data provided',
      details: errors
    });
  }

  // Sanitize data
  if (body.title) body.title = body.title.trim();
  if (body.artist) body.artist = body.artist.trim();
  if (body.genre) body.genre = body.genre.trim();
  if (body.label) body.label = body.label.trim();

  next();
}

/**
 * Validate album data for update (less strict than create)
 */
function validateAlbumUpdate(req, res, next) {
  const { body } = req;
  const errors = [];

  // Check if body exists and has content
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Request body with at least one field to update is required'
    });
  }

  // Validate field types if they are present
  if (body.title !== undefined) {
    if (typeof body.title !== 'string' || body.title.trim().length === 0) {
      errors.push('title must be a non-empty string');
    }
  }

  if (body.artist !== undefined) {
    if (typeof body.artist !== 'string' || body.artist.trim().length === 0) {
      errors.push('artist must be a non-empty string');
    }
  }

  if (body.genre !== undefined) {
    if (typeof body.genre !== 'string' || body.genre.trim().length === 0) {
      errors.push('genre must be a non-empty string');
    }
  }

  if (body.year !== undefined) {
    const year = parseInt(body.year);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      errors.push('year must be a valid number between 1900 and current year');
    }
  }

  if (body.tracks !== undefined) {
    if (!Array.isArray(body.tracks) || body.tracks.length === 0) {
      errors.push('tracks must be a non-empty array');
    }
  }

  if (body.duration !== undefined) {
    if (typeof body.duration !== 'number' || body.duration < 0) {
      errors.push('duration must be a positive number (in seconds)');
    }
  }

  if (body.label !== undefined) {
    if (typeof body.label !== 'string') {
      errors.push('label must be a string');
    }
  }

  // Check for unknown fields
  const unknownFields = Object.keys(body).filter(field => !ALLOWED_FIELDS.includes(field));
  if (unknownFields.length > 0) {
    errors.push(`Unknown fields: ${unknownFields.join(', ')}`);
  }

  // Prevent updating system fields
  if (body.id !== undefined) {
    errors.push('id field cannot be updated');
  }

  if (body.createdAt !== undefined) {
    errors.push('createdAt field cannot be updated');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid update data provided',
      details: errors
    });
  }

  // Sanitize data
  if (body.title) body.title = body.title.trim();
  if (body.artist) body.artist = body.artist.trim();
  if (body.genre) body.genre = body.genre.trim();
  if (body.label) body.label = body.label.trim();

  next();
}

module.exports = {
  validateAlbum,
  validateAlbumUpdate,
  REQUIRED_FIELDS,
  OPTIONAL_FIELDS,
  ALLOWED_FIELDS
};
