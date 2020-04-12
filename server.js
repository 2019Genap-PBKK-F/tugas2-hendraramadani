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
//////////////////////////// UNIT /////////////////////////////////////////

//select
app.get("/api/unit", function (req, res) {
   var query = "SELECT * FROM [unit]";
   console.log('select unit');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/unit/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
    ]
   var query = "DELETE FROM [unit] WHERE id=@id";
   console.log('delete unit');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/unit',function(req,res){
    var query = "INSERT INTO [unit] (kategoriunit_id, nama) VALUES ('', '');"
    console.log('insert unit');
    execute.execqr(res, query, null);
})

//update
app.put('/api/unit/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'kategoriunit_id', sqltype: sql.Int, value: req.body.kategoriunit_id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    var query = "UPDATE [unit] SET nama = @nama, kategoriunit_id = @kategoriunit_id WHERE id = @id;"
    console.log('update unit');
    execute.execqr(res, query, param);
})

////////////////////////////////////////////////////////////////////////////
//////////////////////////// CAPAIAN UNIT //////////////////////////////////
//select
app.get("/api/capaian_unit", function (req, res) {
   var query = "SELECT * FROM [capaian_unit]";
   console.log('select capaian_unit');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/capaian_unit/:datadasar', function (req, res) {
   var param = [
      { name: 'datadasar_id', sqltype: sql.Int, value: req.params.datadasar_id },
      { name: 'unit_id', sqltype: sql.Int, value: req.params.unit_id },
      { name: 'waktu', sqltype: sql.DateTime, value: req.params.waktu }
    ]
   var query = "DELETE FROM [capaian_unit] WHERE datadasar_id=@datadasar_id AND unit_id=@unit_id;"
   console.log();
   execute.execqr(res, query, param);
})

//insert
app.post('/api/capaian_unit',function(req,res){
    var query = "INSERT INTO [capaian_unit] (datadasar_id, unit_id, waktu, capaian) VALUES ('1', '1', CURRENT_TIMESTAMP, '');"
    console.log('insert capaian_unit');
    execute.execqr(res, query,null);
})

//update
app.put('/api/capaian_unit/:datadasar_id',function(req,res){
   var param = [
      { name: 'datadasar_id', sqltype: sql.Int, value: req.params.datadasar_id },
      { name: 'unit_id', sqltype: sql.Int, value: req.params.unit_id },
      { name: 'waktu', sqltype: sql.DateTime, value: req.params.waktu },
      { name: 'capaian', sqltype: sql.Float, value: req.params.capaian }
    ]
    var query = "UPDATE [capaian_unit] SET datadasar_id = @datadasar_id, unit_id = @unit_id, waktu = CURRENT_TIMESTAMP, capaian=@capaian WHERE datadasar_id=@datadasar_id AND unit_id=@unit_id AND waktu=@waktu;"
    console.log('update capaian_unit');
    execute.execqr(res, query, param);
})

////////////////////////////////////////////////////////////////////////////
app.listen(8010, function () {
   console.log('Listen on port 8010')
})