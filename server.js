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
app.get('/', function (req, res) {
   res.send('Hendra Ramadani');
});


//////////////////////////// KATEGORI UNIT ///////////////////////////////////////////

//select
app.get("/api/jenissatker", function (req, res) {
   var query = "SELECT * FROM [jenissatker]";
   console.log('select jenissatker');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/jenissatker/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
    ]
   var query = "DELETE FROM [jenissatker] WHERE id=@id";
   console.log('delete jenissatker');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/jenissatker',function(req,res){
    var query = "INSERT INTO [jenissatker] (nama,create_date,last_update,expired_date) VALUES ('',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'');"
    console.log('insert jenissatker');
    execute.execqr(res, query, null);
})

//update
app.put('/api/jenissatker/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date }
    ]
    var query = "UPDATE [jenissatker] SET nama = @nama, last_update=CURRENT_TIMESTAMP,expired_date=@expired_date WHERE id = @id;"
    console.log('update jenissatker');
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
    var query = "INSERT INTO [datadasar] (nama,create_date,last_update,expired_date) VALUES ('',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'');"
    console.log('insert datadasar');
    execute.execqr(res, query, null);
})

//update
app.put('/api/datadasar/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date }
    ]
    var query = "UPDATE [datadasar] SET nama = @nama, last_update=CURRENT_TIMESTAMP, expired_date=@expired_date WHERE id = @id;"
    console.log('update datadasar');
    execute.execqr(res, query, param);
})

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////// satuan kerja /////////////////////////////////////////

//select
app.get("/api/satuankerja", function (req, res) {
   var query = "SELECT * FROM [satuankerja]";
   console.log('select satuankerja');
   execute.execqr(res, query, null);
});

app.get("/api/namasatuankerja", function(req, res)
{
  var query = "select id, nama as name from jenissatker";
  execute.execqr(res, query, null);
})

//delete
app.delete('/api/satuankerja/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
    ]
   var query = "DELETE FROM [satuankerja] WHERE id=@id";
   console.log('delete satuankerja');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/satuankerja',function(req,res){
    var query = "INSERT INTO [satuankerja] (id_satker,id_jns_satker, id_induk_satker,nama,level_unit,email,create_date,last_update,expired_date) VALUES ('','', '','','','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'')";
    console.log('insert satuankerja');
    execute.execqr(res, query, null);
})

//update
app.put('/api/satuankerja/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
      { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker },
      { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'email', sqltype: sql.VarChar, value: req.body.email },
      { name: 'level_unit', sqltype: sql.VarChar, value: req.body.level_unit },
      { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date }
    ]
    var query = "UPDATE [satuankerja] SET id_satker=@id_satker,id_jns_satker=@id_jns_satker, id_induk_satker=@id_induk_satker, nama=@nama,email=@email,level_unit=@level_unit,last_update=CURRENT_TIMESTAMP,expired_date=@expired_date WHERE id = @id;"
    console.log('update satuankerja');
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

app.get("/api/dddatadasar", function(req, res)
{
  var query = 'select id,nama as name from DataDasar'
  execute.execqr(res, query, null, 0);
})

app.get("/api/ddsatker", function(req, res)
{
  var query = "select id, nama as name from satuankerja";
  execute.execqr(res, query, null);
})

//delete
app.delete("/api/capaian_unit/:id_satker&:id_datadasar&:waktu", function(req, res)
{
  var quote = String.fromCharCode(39);
  var query = "delete from Capaian_Unit where id_satker=" + req.params.id_satker + 'and id_datadasar =' + req.params.id_datadasar + 'and waktu =' + quote + req.params.waktu + quote;
  execute.execqr(res, query, null);
  console.log( req.params.waktu)
})

app.post("/api/capaian_unit/", function(req, res)
{
  var param = [
    { name: 'id_satker', sqltype: sql.Int, value: req.body.DataDasar_id },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.Unit_id },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = 'insert into Capaian_Unit values( @id_satker, @id_datadasar, CURRENT_TIMESTAMP, @capaian )';
  execute.execqr(res, query, param)
})

//update
app.put("/api/capaian_unit/:id_satker&:id_datadasar&:waktu", function(req, res) {
   var quote = String.fromCharCode(39);
   var param = [
     { name: 'id_satker', sqltype: sql.Int, value: req.body.id_satker },
     { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
     { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
     { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
   ]
 
   var query = 'update Capaian_Unit set id_satker = @id_satker, id_datadasar = @id_datadasar, waktu = CURRENT_TIMESTAMP, capaian = @capaian where id_satker = ' + req.params.id_satker + ' and id_datadasar =' + req.params.id_datadasar + 'and waktu =' + quote + req.params.waktu + quote;
   execute.execqr(res, query, param)
 })

////////////////////////////////////////////////////////////////////////////
///////////////////////////////Periode/////////////////////////////////////

//select
app.get("/api/periode", function (req, res) {
   var query = "SELECT * FROM [periode]";
   console.log('select periode');
   execute.execqr(res, query, null);
});

app.get("/api/maxperiode", function (req, res) {
   var query = "SELECT id,nama from periode where id=(select max(id) from periode)";
   console.log('select max periode');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/periode/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.VarChar, value: req.params.id }
    ]
   var query = "DELETE FROM [periode] WHERE id=@id";
   console.log('delete periode');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/periode',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.body.id }
    ]
    console.log(req.body.id)
    var query = "INSERT INTO [periode] (id, nama, create_date, last_update) VALUES (@id+1, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);"
    console.log('insert periode');
    execute.execqr(res, query, param);
})

//updatedd
app.put('/api/periode/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.VarChar, value: req.body.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    var query = 'UPDATE [periode] SET id = @id, nama = @nama, last_update = CURRENT_TIMESTAMP WHERE id = ' + req.params.id;
    console.log('update periode');
    execute.execqr(res, query, param);
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////// Master Indikator ///////////////////////////

//select
app.get("/api/masterindikator", function (req, res) {
   var query = "SELECT * FROM [masterindikator]";
   console.log('select masterindikator');
   execute.execqr(res, query, null);
});

app.get("/api/dddatadasarid", function (req, res) {
   var query = "SELECT id,nama as name FROM [datadasar]";
   console.log('select masterindikator');
   execute.execqr(res, query, null);
});

app.get("/api/ddaspek", function (req, res) {
   var query = "SELECT id,aspek as name FROM [aspek]";
   console.log('select aspek');
   execute.execqr(res, query, null);
});

app.get("/api/ddkomponenaspek", function (req, res) {
   var query = "SELECT id,komponen_aspek as name FROM [aspek]";
   console.log('select komponen_aspek');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/masterindikator/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
    ]
   var query = "DELETE FROM [masterindikator] WHERE id=@id";
   console.log('delete masterindikator');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/masterindikator',function(req,res){
    var query = "INSERT INTO [masterindikator] (id_aspek,komponen_aspek,id_penyebut, id_pembilang, nama, deskripsi, default_bobot, create_date, last_update, expired_date) VALUES ('','','', '', '', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '');"
    console.log('insert masterindikator');
    execute.execqr(res, query, null);
})

//update
app.put('/api/masterindikator/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
      { name: 'komponen_aspek', sqltype: sql.Int, value: req.body.komponen_aspek },
      { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
      { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
      { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
      { name: 'expired_date', sqltype: sql.VarChar, value: req.body.expired_date }
    ]
    var query = "UPDATE [masterindikator] SET id_aspek = @id_aspek, komponen_aspek = @komponen_aspek, id_penyebut = @id_penyebut, id_pembilang = @id_pembilang, nama = @nama, deskripsi = @deskripsi, default_bobot = @default_bobot, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date WHERE id = @id;"
    console.log('update masterindikator');
    execute.execqr(res, query, param);
})

////////////////////////////////////////////////////////////////////////////
//////////////////////////// Indikator Periode ////////////////////////////

//select
app.get("/api/indikatorperiode", function (req, res) {
   var query = "SELECT * FROM [indikator_periode]";
   console.log('select indikatorperiode');
   execute.execqr(res, query, null);
});

app.get("/api/ddperiode", function(req, res)
{
  var query = "select id, nama as name from periode";
  execute.execqr(res, query, null);
})

app.get("/api/ddmasterindikator", function(req, res)
{
  var query = "select id, nama as name from masterindikator";
  execute.execqr(res, query, null);
})

//delete
app.delete('/api/indikatorperiode/:id_master&:id_periode&:bobot', function (req, res) {
   var query = 'DELETE FROM [indikator_periode] WHERE id_master='+req.params.id_master+'and id_periode='+req.params.id_periode+'and bobot='+req.params.bobot;
   console.log('delete indikatorperiode');
   execute.execqr(res, query, null);
})

//insert
app.post('/api/indikatorperiode',function(req,res){
    var query = "INSERT INTO [indikator_periode] (id_master, id_periode, bobot) VALUES ('', '', '');"
    console.log('insert indikatorperiode');
    execute.execqr(res, query, null);
})

//update
app.put('/api/indikatorperiode/:id_master&:id_periode&:bobot',function(req,res){
   var param = [
      { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
      { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
      { name: 'bobot', sqltype: sql.Float, value: req.body.bobot }
    ]
    var query = 'UPDATE [indikator_periode] SET id_master = @id_master, id_periode = @id_periode, bobot = @bobot WHERE id_master=' + req.params.id_master + 'and id_periode=' + req.params.id_periode + 'and bobot=' + req.params.bobot;
    console.log('update indikatorperiode');
    execute.execqr(res, query, param);
})

////////////////////////////////////////////////////////////////////////////
//////////////////////////// Indikator Satuan Kerja ////////////////////////////

//select
app.get("/api/indikatorsatuankerja", function (req, res) {
   var query = "SELECT * FROM [indikator_satuankerja]";
   console.log('select indikatorsatuankerja');
   execute.execqr(res, query, null);
});

app.get("/api/ddperiode", function(req, res)
{
  var query = "select id, nama as name from periode";
  execute.execqr(res, query, null);
})

app.get("/api/ddmasterindikator", function(req, res)
{
  var query = "select id, nama as name from masterindikator";
  execute.execqr(res, query, null);
})

app.get("/api/ddsatuankerja", function(req, res)
{
  var query = "select id, nama as name from satuankerja";
  execute.execqr(res, query, null);
})

//delete
app.delete('/api/indikatorsatuankerja/:id', function (req, res) {
   var query = 'DELETE FROM [indikator_satuankerja] WHERE id='+req.params.id;
   console.log('delete indikatorsatuankerja');
   execute.execqr(res, query, null);
})

//insert
app.post('/api/indikatorsatuankerja',function(req,res){
    var query = "INSERT INTO [indikator_satuankerja] (id_periode, id_master, id_satker, bobot, target, capaian, last_update) VALUES ('', '', '', '', '', '', CURRENT_TIMESTAMP);"
    console.log('insert indikatorsatuankerja');
    execute.execqr(res, query, null);
})

//update
app.put('/api/indikatorsatuankerja/:id',function(req,res){
   var param = [
      { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
      { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
      { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
      { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
      { name: 'target', sqltype: sql.Float, value: req.body.target },
      { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    ]
    var query = 'UPDATE [indikator_satuankerja] SET id_periode = @id_periode, id_master = @id_master, id_satker = @id_satker, bobot = @bobot, target = @target,capaian=@capaian,last_update=CURRENT_TIMESTAMP  WHERE id=' + req.params.id;
    console.log('update indikatorsatuankerja');
    var x = insert_indikator_satuankerja_log(res,param);
    execute.execqr(res, query, param);
})

////////////////////////////////////////////////////////////////////////////
/////////////////////////INDIKATOR SATUAN KERJA LOG ////////////////////////
//select
app.get("/api/indikatorsatuankerjalog", function (req, res) {
   var query = "SELECT * FROM [indikator_satuankerja_log]";
   console.log('select indikatorsatuankerjalog');
   execute.execqr(res, query, null);
});

function insert_indikator_satuankerja_log(res,param) {
   console.log(param);
   var query = "INSERT INTO [indikator_satuankerja_log] (id_periode, id_master, id_satker, capaian, create_date) VALUES (@id_periode, @id_master, @id_satker, @capaian, CURRENT_TIMESTAMP);"
   console.log('insert indikatorsatuankerjalog');
   execute.execqr(res, query, param);
}

//delete
app.delete('/api/indikatorsatuankerjalog/:create_date', function (req, res) {
   var quote = String.fromCharCode(39);
   var query = 'DELETE FROM [indikator_satuankerja_log] WHERE create_date='+quote+req.params.create_date+quote;
   console.log('delete indikatorsatuankerja');
   execute.execqr(res, query, null);
})

/////////////////////////////////////////////////////////////////////////////
//////////////////////////// ASPEK //////////////////////////////////////////

//select
app.get("/api/aspek", function (req, res) {
   var query = "SELECT * FROM [aspek]";
   console.log('select aspek');
   execute.execqr(res, query, null);
});

//delete
app.delete('/api/aspek/:id', function (req, res) {
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
    ]
   var query = "DELETE FROM [aspek] WHERE id=@id";
   console.log('delete aspek');
   execute.execqr(res, query, param);
})

//insert
app.post('/api/aspek',function(req,res){
    var query = "INSERT INTO [aspek] (aspek,komponen_aspek) VALUES ('','');"
    console.log('insert aspek');
    execute.execqr(res, query, null);
})

//update
app.put('/api/aspek/:id',function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
      { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
    ]
    var query = "UPDATE [aspek] SET aspek = @aspek, komponen_aspek = @komponen_aspek WHERE id = @id;"
    console.log('update aspek');
    execute.execqr(res, query, param);
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////DOSEN//////////////////////////////////////////////////////////////

//select
app.get("/api/dosen", function (req, res) {
   var query = "SELECT * FROM [dosen]";
   console.log('select dosen');
   execute.execqr(res, query, null);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////ABMAS//////////////////////////////////////////////////////////////

//select
app.get("/api/abmas", function (req, res) {
   var query = "SELECT * FROM [abmas]";
   console.log('select abmas');
   execute.execqr(res, query, null);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////ABMAS//////////////////////////////////////////////////////////////

//select
app.get("/api/abmas", function (req, res) {
   var query = "SELECT * FROM [abmas]";
   console.log('select abmas');
   execute.execqr(res, query, null);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////PENELITIAN//////////////////////////////////////////////////////////

//select
app.get("/api/penelitian", function (req, res) {
   var query = "SELECT * FROM [penelitian]";
   console.log('select penelitian');
   execute.execqr(res, query, null);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////PUBLIKASI///////////////////////////////////////////////////////////

//select
app.get("/api/publikasi", function (req, res) {
   var query = "SELECT * FROM [publikasi]";
   console.log('select publikasi');
   execute.execqr(res, query, null);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////KONTRAK KINERJA//////////////////////////////////////////////////////
app.get("/api/fakultas/:id", function (req, res) {
   var query = "select i.id_satker , m.id_aspek, m.komponen_aspek, m.nama, i.bobot, i.target, i.capaian  from indikator_satuankerja as i, masterindikator as m where i.id_master=m.id AND i.id_satker="+req.params.id;
   console.log('select kontrak kinerja');
   execute.execqr(res, query, null);
});

app.get('/api/ddkontrakkinerja/:id', function(req,res){  
   var param = [
     { name: 'id_satker', sqltype: sql.VarChar, value: req.params.id}
   ]
   var query = "select id, id_satker, nama from satuankerja where (id_satker = @id_satker or id_induk_satker = @id_satker) and (nama like 'Departemen%' or nama like 'Fakultas%') order by id";
   execute.execqr(res, query, param);
 });



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/auth/login/", function(req, res){
   var param = [
     { name: 'email', sqltype: sql.VarChar, value: req.body.username},
     { name: 'password', sqltype: sql.VarChar, value: req.body.password}
   ]
   var query = "select id_satker, nama from satuankerja where email = @email and @email = @password";
   execute.execqr(res, query, param);
 });

app.listen(8010, function () {
   console.log('Listen on port 8010')
})