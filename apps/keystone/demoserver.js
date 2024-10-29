const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser()); // Use cookie parser middleware

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log('Received request:');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('IP:', req.ip);
  console.log('Domain:', req.get('host'));
  console.log('Cookies:', JSON.stringify(req.cookies));
  console.log('Body:', JSON.stringify(req.body)); // For logging body, you'll need to use express.json() middleware if you expect JSON payloads
  next(); // Call the next middleware
});

// Simple route to respond
app.get('/api/graphql', (req, res) => {
  res.send('Hello, World!');
});
app.post('/api/graphql', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3101;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
