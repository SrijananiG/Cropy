const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let fields = [];

app.post('/save-field', (req, res) => {
    const field = req.body;
    fields.push(field);
    res.send({ message: 'Field saved successfully!' });
});

app.get('/fields', (req, res) => {
    res.send(fields);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});