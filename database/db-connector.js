// Citation for project
// Adapted from starter app code provided by CS340 class.
// Code Modified to better reflect the needs of the project.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

var mysql = require('mysql');
const credentials = {
    connectionLimit: 10,
    host: '',
    user: '', // please add user name here
    password: '', // please add password here
    database: ''

};
var dbUser = process.env.DB_USER;
var pool = mysql.createPool(credentials[dbUser]);
module.exports.pool = pool;