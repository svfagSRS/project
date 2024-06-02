var express = require('express');
var router = express.Router();
var database = require('../database');



router.get('/', function(req, res, next) {
    //car = 'suv';
    database.query(
        
        'SELECT * FROM automobile WHERE types = "suv"', (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(results)
             //Render the index template with the list of a blog posts
            res.render('suvs-catalog', {autos:results});
        })

});


module.exports = router;