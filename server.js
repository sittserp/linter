// where express will live
const express = require('express');
const app = express();
const Linter = require('./Linter');

app.use(express.json());

// endpoints
app.post('/api/v1/linter', (req, res) => {
    const text = new Linter(req.body.text);
    res.send(text.asLinted());
});

// listen
app.listen(7890, () => {
    console.log('started on 7890');
});