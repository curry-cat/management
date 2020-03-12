const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/api/customers', (req,res) =>{
    res.send([
            {
              "idx": 1,
              "id":"hong",
              "img":"https://placeimg.com/80/80/human1",
              "name":"홍길동",
              "birth":"961222",
              "gender":"남자",
              "job":"대학생"
            },
            {
              "idx": 2,
              "id":"big",
              "img":"https://placeimg.com/80/80/human2",
              "name":"배민지",
              "birth":"981222",
              "gender":"여자",
              "job":"학생"
            },
            {
              "idx": 3,
              "id":"big",
              "img":"https://placeimg.com/80/80/human3",
              "name":"이지수",
              "birth":"971222",
              "gender":"남자",
              "job":"직장인"
            }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));