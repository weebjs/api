const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const p = require("primebit.js");

const app = express();

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/animememes', async (req, res) => {
  try {
    const response = await axios.get('https://meme-api.com/gimme/animememes');
    const { postLink, subreddit, title, url, author } = response.data;
    const filter = { postLink, subreddit, title, url, author };
    res.json(filter);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the meme.' });
  }
});

const port = 3000;
app.listen(port, () => {
  p.log("Connecting to API...");
  p.success(`Connection complete! API running on localhost:${port}!`);
});
