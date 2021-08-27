const express = require('express');
const path = require('path');
const { Dict } = require('./dict');

const PORT = process.env.PORT || 3001;
const app = express();
const dict = new Dict();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.get('/api/translate/:dictName/:word', (req, res) => {
  try {
    const { dictName, word } = req.params;
    const data = dict.translate({ dictName, word });

    if (data === null) res.status(404).send('Not found');
    else res.json({ data }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/translate', (req, res) => {
  try {
    const data = dict.listDictionaries();
    res.json({ data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});