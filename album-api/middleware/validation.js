const { body, validationResult, query } = require('express-validator');

// Validation rules for album creation/update
const albumValidationRules = () => {
  return [
    body('title')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Title is required and must be between 1 and 200 characters'),
    
    body('artist')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Artist is required and must be between 1 and 100 characters'),
    
    body('year')
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage(`Year must be between 1900 and ${new Date().getFullYear() + 1}`),
    
    body('genre')
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Genre is required and must be between 1 and 50 characters'),
    
    body('tracks')
      .optional()
      .isArray({ min: 1 })
      .withMessage('Tracks must be an array with at least one track'),
    
    body('tracks.*')
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Each track name must be between 1 and 200 characters'),
    
    body('coverUrl')
      .optional()
      .isURL()
      .withMessage('Cover URL must be a valid URL'),
    
    body('rating')
      .optional()
      .isFloat({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5')
  ];
};

// Validation rules for query parameters
const queryValidationRules = () => {
  return [
    query('artist')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Artist filter must be between 1 and 100 characters'),
    
    query('genre')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Genre filter must be between 1 and 50 characters'),
    
    query('year')
      .optional()
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage(`Year filter must be between 1900 and ${new Date().getFullYear() + 1}`),
    
    query('minRating')
      .optional()
      .isFloat({ min: 1, max: 5 })
      .withMessage('Minimum rating must be between 1 and 5')
  ];
};

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

// Middleware to validate ID parameter
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: 'ID must be a positive integer'
    });
  }
  
  req.params.id = id;
  next();
};

module.exports = {
  albumValidationRules,
  queryValidationRules,
  validate,
  validateId
};
