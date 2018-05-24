const mysql = require('mysql');

//create connection
var db = mysql.createConnection({
    host: 'drakonit.nl',
    user: 'timbrrf252_ictlab',
    password: 'ictlabhro',
    database: 'timbrrf252_roomreserve'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected');
});

exports.Connection = db;