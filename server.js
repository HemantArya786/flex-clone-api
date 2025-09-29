const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Your shows data
const shows = [
  {
    title: "Heartstopper",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    rating: "U/A 16+",
    seasons: "4 Seasons",
    genres: ["Nostalgic", "Ominous", "Sci-Fi TV"],
    isNew: true,
  },
  {
    title: "Money Heist",
    image: "https://images.unsplash.com/photo-1489599142406-ba4bb7abaa98?w=400&h=300&fit=crop",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    rating: "U/A 16+",
    seasons: "5 Seasons",
    genres: ["Crime", "Thriller", "Drama"],
    isNew: false,
  },
  {
    title: "Stranger Things",
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=300&fit=crop",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    rating: "U/A 16+",
    seasons: "4 Seasons",
    genres: ["Nostalgic", "Ominous", "Sci-Fi TV"],
    isNew: false,
  },
  {
    title: "Stranger Things",
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=300&fit=crop",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    rating: "U/A 16+",
    seasons: "4 Seasons",
    genres: ["Nostalgic", "Ominous", "Sci-Fi TV"],
    isNew: false,
  },
  {
    title: "The Crown",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    rating: "U/A 13+",
    seasons: "6 Seasons",
    genres: ["Period Drama", "Historical", "Royal"],
    isNew: true,
  },
];

// Enable CORS for all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Shows API server running on port ${PORT}`);
});