const express = require('express');
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');
const storedNotes = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(storedNotes);
});

app.post('/api/notes', (req, res) => {
    let newNote;
    
    if (req.body && req.body.title && req.body.text) {
        newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid()
        };
        storedNotes.push(newNote);
        fs.writeFile(`./db/db.json`, JSON.stringify(storedNotes), (err) => {
            if(err) console.error(err);
        })
        res.json(newNote);
    } else {
        res.json('Note must contain a title and text!');
    }
    
})

app.delete('/api/notes', (req, res) => {
    
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);