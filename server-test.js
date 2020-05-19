// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require('express')

const app = express()

var todos = {}

// POST request
app.post('/todos', (req, res) => {
    var todo = req.body.todo
    
    todos.push(todo)

    res.send(todo)
})

// GET todos request
app.get('/todos', (req, res) => {
    res.json(todos)
})

// GET single todo request
app.get('/todos/:id', (req, res) => {
    var todo = _.find(todos, {id: req.params.id})

    res.json(todo)
})

// start server
app.listen(3000, console.log('Server listening on: 3000'))

var jsonData = {count: 12, message: 'hey'};
