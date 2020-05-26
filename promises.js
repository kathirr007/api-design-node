/* var action = function(cb) {
    setTimeout(function() {
        cb('Hey...')
    }, 5000)
}

action(function(arg){
    console.log(arg)
}) */

var fs = require('fs')

var readFile = function(){
    return new Promise(function(resolve, reject) {
        fs.readFile('./package.json', function(err, file) {
            return err ? reject(err) : resolve(file.toString())
        })
    })
}

var readAllFiles = function() {
    var promises = [readFile(), readFile(), readFile()]
    return Promise.all(promises)
}

/* readFile()
    .then(function(file) {
        console.log(file)
    })
    .catch(function(err){
        console.log(err)
    })
    .finally(function() {
        console.log('The function "Readfile" is completed...')
    }) */

readAllFiles()
    .then(function(files) {
        console.log(files.length)
    })