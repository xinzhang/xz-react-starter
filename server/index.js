const path = require('path');
const express = require('express');
const app = express();
const port = process.env.port || 3000;


app.use(express.static(path.join(__dirname, '../build')));

app.get('/health', (req, res) => {
  res.send('health check: OK');
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`MERN app is listending on port ${port}`));
