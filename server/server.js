// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// POST request to create lion module
app.post('/lions', (req,res) => {
    var lion = req.body
    id++
    lion.id = id + ''

    lions.push(lion)

    res.json(lion)
})

//GET request to get all lions
app.get('/lions', (req,res) => {
    res.json(lions)
})

//GET request to get specific lion
app.get('/lions/:id', (req,res) => {
    let lion = _.find(lions, {id: req.params.id})

    res.json(lion || {})
})

//PUT request to update specific lion
app.put('/lions/:id', (req,res) => {
    let update = req.body
    if(update.id) {
        delete update.id
    }

    let lion = _.findIndex(lions, {id: req.params.id})
    if(!lions[lion]) {
        res.send()
    } else {
        let updatedLion = _.assign(lions[lion], update)
        res.json(updatedLion)
    }
})

app.delete('/lions/:id', (req, res) => {
    let lion = _.findIndex(lions, {id: req.params.id})
    if(!lions[lion]) {
        res.send()
    } else {
        let deletedLion = lions[lion]
        lions.splice(lion, 1)
        res.json(deletedLion)
    }
})

// TODO: make the REST routes to perform CRUD on lions
let port = 3000
app.listen(port, (_) => {
    console.log(`The server listening on http://localhost:${port}`)
});
