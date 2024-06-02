
var express = require('express');
var router = express.Router();
var database = require('../database');


router.post('/',(request, response) => {
    const {fullname, email, cardName, address, cardNo, city, month, county, zip, exyear, cvv} = (request.body)

    database.query(
        'INSERT INTO payments(fullname, email, cardName, customer_address, cardNo, city, mon, county, zip, exyear, cvv, customer_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', 
        [fullname, email, cardName, address, cardNo, city, month, county, zip, exyear, cvv, 1], (err, results) => {
            if (err) {
                console.log('error in the house')
                return response.status(500).send(err);
            }   
            
            return response.status(200).send(results)
        })    
    })


module.exports = router;