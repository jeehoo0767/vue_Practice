const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const data = fs.readFileSync('database.json');
const conf = JSON.parse(data);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/image', express.static('./upload'));

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const upload = multer({ dest: './upload' });

app.get('/api/user', (req, res) => {
    connection.query(
        "SELECT * FROM user",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
    // res.send({message : "hello"});
});

app.get('/api/user', (req, res) => {
    // connection.query(
    //     "SELECT * FROM CUSTOMER WHERE isdeleted = 0",
    //     (err, rows, fields) => {
    //         res.send(rows);
    //     }
    // );
    res.send({ message: "hello" });
});

app.post('/api/user', (req, res) => {
    let sql = 'insert into user values (?, ?)';
    let userId = req.body.userId;
    let userPassword = req.body.userPassword;
    let params = [userId, userPassword];
    console.log(userId);
    console.log(userPassword);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.post('/api/user', (req, res) => {
    let sql = 'insert into user values (?, ?)';
    let userId = req.body.userId;
    let userPassword = req.body.userPassword;
    console.log(userId);
    console.log(userPassword);
    let params = [userId, userPassword];
    connection.query(sql, params,
        (err, rows, fields) => {
            if (err) {
                console.log("fuck");
                res.json({ resultCode: false });
            }
            else {
                res.send(rows);
            }
        }
    )
});

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isdeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'insert into customer values (null, ?, ?, ?, ?, ?, now(),0)';
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'update customer set isdeleted = 1 where id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.listen(port, () => console.log(`리스닝 온 포트 ${port}`));