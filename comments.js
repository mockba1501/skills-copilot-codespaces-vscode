//create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { json } = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'comments.html'));
});

app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            }
            res.json({ success: true });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});