const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id' : 1,
        'image' : 'https://placeimg.com/64/64/1',
        'name' : '박지후',
        'birthday' : '961005',
        'gender' : '남자',
        'job' : '학생'
        },
        {
            'id' : 2,
            'image' : 'https://placeimg.com/64/64/2',
            'name' : '홍길동',
            'birthday' : '960305',
            'gender' : '남자',
            'job' : '게이머'
        },
        {
            'id' : 3,
            'image' : 'https://placeimg.com/64/64/3',
            'name' : '손흥민',
            'birthday' : '124045',
            'gender' : '남자',
            'job' : '선수'
        },
    ]);
   
});

app.listen(port, () => console.log(`리스닝 온 포트 ${port}`));