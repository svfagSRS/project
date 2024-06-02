
var express = require('express');
var router = express.Router();
var database = require('../database');


router.post('/create', function(req, res, next) {
    console.log('called')
    var {fname, lname, email, country, message} = req.body
    console.log(req.body)

    database.query('INSERT INTO contacts(firstname, lastname, email, country, message) VALUES(?,?,?,?,?)', [fname, lname, email, country, message], (err, results) => {
        if (err) {
            console.log('error in the house')
            console.log(err)
            return res.status(500).send(err);
        }    

        return res.status(200).send(results)
        
        // res.redirect('../welcome?id='+email)   //Render the index template with the list of a blog posts
    })

    return
});

router.get('/',(request, response) => {
          
    response.render('contact');
        
})



module.exports = router;