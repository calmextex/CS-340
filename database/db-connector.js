// Source:  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

var mysql = require('mysql');
const credentials = {
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: '', // please add user name here
    password: '', // please add password here

};
var dbUser = process.env.DB_USER; // please add user name here
var pool = mysql.createPool(credentials[dbUser]);
module.exports.pool = pool;