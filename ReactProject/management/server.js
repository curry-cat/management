const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req,res) =>{
    connection.query(
      "SELECT * FROM CUSTOMER",
    (err,rows, fields) =>{
      res.send(rows);
    });
});

app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('img'), (req,res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (?, ?, ?, ?, ?, ?)';
  let id = req.body.id;
  let img = '/image/' + req.file.filename;
  let name = req.body.name;
  let birth = req.body.birth;
  let gender = req.body.gender;
  let job = req.body.job;
  console.log(id + img + name + birth + gender + job);

  let params = [id,img, name, birth, gender, job];
  connection.query(sql, params, 
    (err,rows, fields) =>{
      res.send(rows);
    }
  );
})

app.listen(port, () => console.log(`Listening on port ${port}`));