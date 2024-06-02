var express = require('express');
var router = express.Router();
var database = require('../database');



router.get('/', function(req, res, next) {
     car = 'car';
    database.query(
        
        'SELECT * FROM automobile WHERE types = "car"', (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(results)
             //Render the index template with the list of a blog posts
            res.render('cars-catalog', {autos:results});
        })

});


module.exports = router;