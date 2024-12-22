//Create web server
const express = require('express');
const app = express();
const path = require('path');

//initialize the database
const db = require('./db');
const { Comment } = db.models;

//middleware
app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//routes
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/comments', (req, res, next) => {
  Comment.findAll()
    .then(comments => res.send(comments))
    .catch(next);
});

app.post('/api/comments', (req, res, next) => {
  Comment.create(req.body)
    .then(comment => res.status(201).send(comment))
    .catch(next);
});

app.delete('/api/comments/:id', (req, res, next) => {
  Comment.findByPk(req.params.id)
    .then(comment => comment.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

//server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

db.sync()
  .then(() => db.seed());
//end Path: comments.js