const express = require('express');
const cors = require('cors');
const albumRoutes = require('./routes/albums');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/albums', albumRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
