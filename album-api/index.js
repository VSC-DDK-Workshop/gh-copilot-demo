const express = require('express');
const app = express();
const albumRoutes = require('./routes/albums');

// Middleware
app.use(express.json());

// Routes
app.use('/api/albums', albumRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Albums API' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Configure server
const PORT = process.env.PORT || 3000;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for testing
module.exports = app;
