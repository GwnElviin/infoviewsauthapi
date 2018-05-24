var util = require('util');

// MySQL Database config
const db = require('.././db_settings')

var con = db.Connection;

/***
 * Every API that has to do with USERS
***/ 
var Users = function () {};

Users.prototype.getAllUsers = (callback) => {
    const sql = "SELECT * FROM user";
    con.query(sql, (err, result) => callback(result));
};

Users.prototype.getAllSecureUsers = (callback) => {
    const sql = "SELECT * FROM user";
    con.query(sql, (err, result) => callback(result));
};

Users.prototype.loginUser = (username, password, callback) => {
    const sql = `SELECT * FROM user WHERE user_name='${username}' AND user_password='${password}'`;
    con.query(sql, (err, result) => callback(result));
};

Users.prototype.registerUser = (username, usermail, password, callback) => {
    const sql = `INSERT INTO user (user_id, user_group, user_name, user_mail, user_password, user_role) VALUES ('3','1',${username}', '${usermail}','${password}', 'user')`;
    con.query(sql, (err, result) => callback(result));
};

// Exports to make it visible to main.js
exports.Users = new Users();