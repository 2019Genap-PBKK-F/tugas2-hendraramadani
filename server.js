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
app.get("/api/mahasiswa", function (req, res) {
   var query = "SELECT * FROM [mahasiswa]";
   console.log('select data');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/mahasiswa/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
    ]
   var query = "DELETE FROM [mahasiswa] WHERE id=@id";
   console.log('delete data');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/mahasiswa',function(req,res){
    var query = "INSERT INTO [mahasiswa] (nrp,nama,jk,lahir,foto,aktif,angkatan) VALUES ('', '', '', '', '', '', '');"
    console.log('insert data');
    execute.execqr(res, query, null);
})

//update
app.put('/api/mahasiswa/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'angkatan', sqltype: sql.Int, value: req.body.angkatan },
      { name: 'jk', sqltype: sql.Char, value: req.body.jk },
      { name: 'lahir', sqltype: sql.Char, value: req.body.lahir },
      { name: 'foto', sqltype: sql.VarChar, value: req.body.foto },
      { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif }
    ]
    var query = "UPDATE [mahasiswa] SET nrp = @nrp, nama = @nama, jk = @jk, lahir = @lahir, foto = @foto, aktif = @aktif, angkatan = @angkatan WHERE id = @id;"
    console.log('update data');
    execute.execqr(res, query, param);
})

app.listen(8010, function () {
   console.log('Listen on port 8010')
})