//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var cors = require("cors");
var app = express(); 
// Body Parser Middleware
app.use(bodyParser.json());
//Enabling CORS  
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

var execute = require("./controller/sqlconn.js")

//Home
app.get("/", function (req, res) {
   res.send('Hendra Ramadani');
});

//select all
app.get("/api/datadasar", function (req, res) {
   var query = "SELECT * FROM [datadasar]";
   console.log('select data');
   execute.execqr(res, query, null);
});

app.get("/api/capaianunit", function (req, res) {
   var query = "SELECT * FROM [capaian_unit]";
   console.log('select data');
   execute.execqr(res, query, null);
});

app.get("/api/unit", function (req, res) {
   var query = "SELECT * FROM [unit]";
   console.log('select data');
   execute.execqr(res, query, null);
});


//////////////////////////// KATEGORI UNIT ///////////////////////////////////////////

//select
app.get("/api/kategoriunit", function (req, res) {
   var query = "SELECT * FROM [kategoriunit]";
   console.log('select kategoriunit');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/kategoriunit/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
    ]
   var query = "DELETE FROM [kategoriunit] WHERE id=@id";
   console.log('delete kategoriunit');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/kategoriunit',function(req,res){
    var query = "INSERT INTO [kategoriunit] (nama) VALUES ('');"
    console.log('insert kategoriunit');
    execute.execqr(res, query, null);
})

//update
app.put('/api/kategoriunit/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    var query = "UPDATE [kategoriunit] SET nama = @nama WHERE id = @id;"
    console.log('update kategoriunit');
    execute.execqr(res, query, param);
})

////////////////////////////////////////////////////////////////////////////
//////////////////////////// DATA DASAR ////////////////////////////////////

//select
app.get("/api/datadasar", function (req, res) {
   var query = "SELECT * FROM [datadasar]";
   console.log('select datadasar');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/datadasar/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
    ]
   var query = "DELETE FROM [datadasar] WHERE id=@id";
   console.log('delete datadasar');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/datadasar',function(req,res){
    var query = "INSERT INTO [datadasar] (nama) VALUES ('');"
    console.log('insert datadasar');
    execute.execqr(res, query, null);
})

//update
app.put('/api/datadasar/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    var query = "UPDATE [datadasar] SET nama = @nama WHERE id = @id;"
    console.log('update datadasar');
    execute.execqr(res, query, param);
})

////////////////////////////////////////////////////////////////////////////
app.listen(8010, function () {
   console.log('Listen on port 8010')
})