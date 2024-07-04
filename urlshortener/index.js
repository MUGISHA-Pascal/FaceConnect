const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const urlDatabase = {};


function generateCode() {
  return Math.random().toString(36).substr(2, 6); 
}


app.get('/:code', (req, res) => {
  const code = req.params.code;
  const originalUrl = urlDatabase[code];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;
  const code = generateCode();
  urlDatabase[code] = originalUrl;
  const shortUrl = `http://localhost:3000/${code}`;
  res.json({ shortUrl });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});