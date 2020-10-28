const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const data = fs.readFileSync('database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


// app.use(session({ // session 미들웨어
//     secret: '1234DSFs@adf1234!@#&asd',
//     resave: false,
//     saveUninitialized: true,
//     store: new MySQLStore({
//         host : conf.host,
//         user : conf.user,
//         password : conf.password,
//         port : conf.port,
//         database : conf.database
//     })
//     }));
    
    const connection = mysql.createConnection({
        host : conf.host,
        user : conf.user,
        password : conf.password,
        port : conf.port,
        database : conf.database
    });
    connection.connect();

app.use(passport.initialize()); // passport 초기화
app.use(passport.session()); // session을 사용

const multer = require('multer');
const upload = multer({dest : './upload'});

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isdeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
        // res.send({message : "hello"});
});

app.use('/image', express.static('./upload'));


app.get('/api/user', (req, res) => {
    connection.query(
        "SELECT * FROM user",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
    // res.send({message : "hello"});
});

app.post('/api/login', (req,res)=>{
    let sqlUserIdCheck = 'select * from user where userId = ?';
    let sqlUserPasswordCheck = `select * from user where userPassword = ?`;
    let userId = req.body.userId;
    let userPassword = req.body.userPassword;
    let params = [userId, userPassword];
    const emptyArr = [];
    connection.query(sqlUserIdCheck, [userId],
        (err, rows, fields)=>{
            if(rows.length === 0){
                console.log(err);
                res.json({ LoginCode : false });
            }
            else{
                console.log("else : " + rows);
            res.send(rows);
        }
        })
})

app.post('/api/user', (req,res)=>{
    let sql = 'insert into user values (?, ?)';
    let userId = req.body.userId;
    let userPassword = req.body.userPassword;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(userPassword + salt).digest("hex");
    console.log(userId);
    console.log(userPassword);
    let params = [userId, hashPassword];
    connection.query(sql,params,
        (err, rows, fields)=> {
            if (err) {
                console.log(err);
                res.json({ resultCode : false });
            }
            else {
            res.send(rows);
            // res.render('client/components/CustomerAdd');
            }
        }
     )
});

app.post('/api/customers', upload.single('image'), (req, res) =>{
    let sql = 'insert into customer values (null, ?, ?, ?, ?, ?, now(),0)';
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params, 
        (err, rows, fields) =>{
            res.send(rows);
        }
    )  
});

app.get('/api/user', (req, res) => {
    // connection.query(
    //     "SELECT * FROM CUSTOMER WHERE isdeleted = 0",
    //     (err, rows, fields) => {
    //         res.send(rows);
    //     }
    // );
    res.send({message : "hello"});
});

// app.post('/api/user', (req, res) =>{
//     let sql = 'insert into user values (?, ?)';
//     let userId = req.body.userId;
//     let userPassword = req.body.userPassword;
//     let params = [userId, userPassword];
//     console.log(userId);
//     console.log(userPassword);
//     connection.query(sql, params, 
//         (err, rows, fields) =>{
//             res.send(rows);
//         }
//     )  
// });

app.delete('/api/customers/:id', (req,res) =>{
    let sql = 'update customer set isdeleted = 1 where id = ?';
    let params =[req.params.id];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows);
        }
    )
})

app.listen(port, () => console.log(`리스닝 온 포트 ${port}`));