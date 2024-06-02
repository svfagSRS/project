
var express = require('express');
var router = express.Router();
var database = require('../database');


router.get('/',(request, response) => {
    const id = (request.query.id)
    console.log(id)
    database.query(
        
        'SELECT * FROM automobile WHERE id=?', [id], (err, results) => {
            if (err) {
                return response.status(500).send(err);
            }
            console.log(results)
            response.render('gallery', {gallery: results})   //Render the index template with the list of a blog posts
        })
   
})

module.exports = router;