var express = require('express');
var router = express.Router();
var database = require('../database');



router.get('/', function(req, res, next) {
    //car = 'bus';
    database.query(
        
        'SELECT * FROM automobile WHERE types = "bus"', (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(results)
             //Render the index template with the list of a blog posts
            res.render('buses-catalog', {autos:results});
        })

});


module.exports = router;