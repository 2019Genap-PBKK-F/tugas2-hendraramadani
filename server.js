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

app.get("/api/namakategori", function(req, res)
{
  var query = "select id, nama as name from kategoriunit";
  execute.execqr(res, query, null);
})

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
   execute.execqr(res, query, null,0);
});

app.get("/api/datadasar/nama", function(req, res)
{
  var query = 'select id,nama as name from DataDasar'
  execute.execqr(res, query, null, 0);
})

app.get("/api/namaunit", function(req, res)
{
  var query = "select id, nama as name from Unit";
  execute.execqr(res, query, null);
})

//delete
app.delete("/api/capaian_unit/:DataDasar_id&:Unit_id&:waktu", function(req, res)
{
  var quote = String.fromCharCode(39);
  var query = "delete from Capaian_Unit where DataDasar_id=" + req.params.DataDasar_id + 'and Unit_id =' + req.params.Unit_id + 'and waktu =' + quote + req.params.waktu + quote;
  execute.execqr(res, query, null);
  console.log( req.params.waktu)
})

app.post("/api/capaian_unit/", function(req, res)
{
  var param = [
    { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
    { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = 'insert into Capaian_Unit values( @DataDasar_id, @Unit_id, CURRENT_TIMESTAMP, @capaian )';
  execute.execqr(res, query, param)
})

//update
app.put("/api/capaian_unit/:DataDasar_id&:Unit_id&:waktu", function(req, res) {
   var quote = String.fromCharCode(39);
   var param = [
     { name: 'DataDasar_id_new', sqltype: sql.Int, value: req.body.DataDasar_id },
     { name: 'Unit_id_new', sqltype: sql.Int, value: req.body.Unit_id },
     { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
     { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
   ]
 
   var query = 'update Capaian_Unit set DataDasar_id = @DataDasar_id_new, Unit_id = @Unit_id_new, waktu = CURRENT_TIMESTAMP, capaian = @capaian where DataDasar_id = ' + req.params.DataDasar_id + ' and Unit_id =' + req.params.Unit_id + 'and waktu =' + quote + req.params.waktu + quote;
   execute.execqr(res, query, param)
 })

////////////////////////////////////////////////////////////////////////////
app.listen(8010, function () {
   console.log('Listen on port 8010')
})