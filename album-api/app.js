const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const albumRoutes = require('./routes/albums');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'album-api'
  });
});

// API routes
app.use('/api/albums', albumRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🎵 Album API server running on port ${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 Albums API: http://localhost:${PORT}/api/albums`);
  });
}

module.exports = app;
