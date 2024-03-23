const express = require('express');
const bodyParser = require('body-parser');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const p = require("primebit.js");
const path = require("path");

const app = express();

const options = process.argv[2]; // Access the first command-line argument

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'website')));

app.get('/animememes', async (req, res) => {
  try {
    const response = await axios.get(`https://meme-api.com/gimme/${options}`);
    const { postLink, subreddit, title, url, author, ups } = response.data;
    const filter = { postLink, subreddit, title, url, author, ups };
    res.json(filter);
  } catch (error) {
    res.status(500).json({ code: "500", error: 'an error occurred while fetching the anime meme.' });
  }
});

app.get('*', (req, res) => {
  res.status(404).json({ code: '404', message: "subreddit has no posts or doesn't exist." });
});

const port = 3000;
app.listen(port, () => {
  p.log("Connecting to API...");
  p.success(`Connection complete! API running on localhost:${port}!`);
});
