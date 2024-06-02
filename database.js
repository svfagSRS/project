const mysql = require('mysql');


const automobile_sale = mysql.createConnection({
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'automobile_sale',
})

automobile_sale.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to Database Successfully');
})

module.exports = automobile_sale;

