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

const connection = mysql.createConnection({ //database.json 내에 있는 데이터로 DB연결
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

const multer = require('multer'); //랜덤으로 설정되는 값
const upload = multer({dest: './upload'})

app.get('/api/customers', (req,res) =>{ //리스트 조회 호출
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err,rows, fields) =>{
      res.send(rows);
    });
});

app.use('/image', express.static('./upload'));  //사용자에게 (/image)로 보여지는 서버의(./upload)폴더
app.post('/api/customers', upload.single('img'), (req,res) => {   //DB에 저장, upload폴더에 이미지 multer로 정한 이름으로 저장
  let sql = 'INSERT INTO CUSTOMER VALUES (?, ?, ?, ?, ?, ?, NOW(), 0)';
  let id = req.body.id;
  let img = '/image/' + req.file.filename;
  let name = req.body.name;
  let birth = req.body.birth;
  let gender = req.body.gender;
  let job = req.body.job;
  console.log(id + img + name + birth + gender + job);

  let params = [id,img, name, birth, gender, job];
  connection.query(sql, params, //DB로 파라미터 전송
    (err,rows, fields) =>{
      res.send(rows);
    }
  );
})

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fileds) => {
        res.send(rows);
      }
    )
})

app.listen(port, () => console.log(`Starting on port ${port}`));