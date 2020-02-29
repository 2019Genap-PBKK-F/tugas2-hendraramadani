//start the program
var express = require('express');
var app = express();

app.get('/', function (req, res) {

    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'SaSa1212',
        server: '10.199.13.253', 
        database: 'nrp05111740000055' 
    };

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records

        request.query("select * From [mahasiswa]", function (err, recordset) {            
            if  (err) console.log(err)

            // send records as a response
            res.send(recordset);

        });
    });
});

var server = app.listen(8010, function () {
    console.log('Server is running : 8010');
});