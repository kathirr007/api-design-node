// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require('express')
const fs = require('fs')

const app = express()

var todos = {}

// POST request


// GET todos request
app.get('/', (req, res) => {
    
    /* res.sendFile('index.html', {root: __dirname}, function(err) {
        if(err) {
            res.status(500).send(err)
        }
    }) */

    fs.readFile('index.html', (err, buffer) => {
        let html = buffer.toString()

        res.setHeader('Content-Type', 'text/html')
        res.send(html)
    })
})

// GET todos request
app.get('/data', (req, res) => {
    res.json(jsonData)
})

// GET single todo request
app.get('/todos/:id', (req, res) => {
    var todo = _.find(todos, {id: req.params.id})

    res.json(todo)
})

// start server
app.listen(3000, console.log('Server listening on: http://localhost:3000'))

var jsonData = {count: 12, message: 'hey'};
