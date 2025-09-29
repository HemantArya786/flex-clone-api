const express = require('express');
const { shows } = require('./data');
const app = express();
const PORT = process.env.PORT || 8080;

// Your shows data


// Enable CORS for all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Shows API',
    version: '1.0.0',
    endpoints: {
      shows: '/api/shows',
      show_by_index: '/api/shows/:index',
      show_by_id: '/api/show/:id',
      health: '/health'
    }
  });
});

// API endpoints
app.get('/api/shows', (req, res) => {
  res.json({ success: true, data: shows });
});

app.get('/api/shows/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < shows.length) {
    res.json({ success: true, data: shows[index] });
  } else {
    res.status(404).json({ success: false, message: 'Show not found' });
  }
});

app.get('/api/show/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const show = shows.find(s => s.id === id);
  if (show) {
    res.json({ success: true, data: show });
  } else {
    res.status(404).json({ success: false, message: 'Show not found' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Shows API server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;