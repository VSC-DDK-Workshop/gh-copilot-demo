const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const albumRoutes = require('./routes/albums');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'album-api',
        version: '1.0.0'
    });
});

// API routes
app.use('/api/albums', albumRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Album API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            albums: '/api/albums'
        },
        documentation: {
            'GET /api/albums': 'Get all albums',
            'GET /api/albums/:id': 'Get album by ID',
            'POST /api/albums': 'Create new album',
            'PUT /api/albums/:id': 'Update album',
            'DELETE /api/albums/:id': 'Delete album'
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.originalUrl} not found`,
        timestamp: new Date().toISOString()
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Handle JSON parsing errors
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid JSON format',
            timestamp: new Date().toISOString()
        });
    }
    
    // Handle other errors
    res.status(err.status || 500).json({
        error: err.name || 'Internal Server Error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
        timestamp: new Date().toISOString()
    });
});

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🎵 Album API server running on port ${PORT}`);
        console.log(`📖 API documentation available at http://localhost:${PORT}`);
        console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
    });
}

module.exports = app;
