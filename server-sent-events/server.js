const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
};
app.use(cors(corsOptions));

// SSE endpoint
app.get('/events', cors(corsOptions), (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send a welcome message
  res.write('data: Welcome to the server-sent events demo\n\n');

  // Function to send notifications
  const sendNotification = (message) => {
    res.write(`data: ${message}\n\n`);
  };

  let count = 0;
  const intervalId = setInterval(() => {
    if (count >= 5) {
      clearInterval(intervalId);
      // res.end();
    } else {
      sendNotification(`This is notification ${count + 1} from the server.`);
      count++;
    }
  }, 5000);



  // Handle client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
