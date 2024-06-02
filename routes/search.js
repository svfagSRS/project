
var express = require('express');
var router = express.Router();
var database = require('../database');


router.post('/create',(request, response) => {
    const {id} = (request.body)
    console.log(id)
    database.query(
        'INSERT INTO cart(automobile_id) VALUES(?)', [id], (err, results) => {
            if (err) {
                console.log('error in the house')
                return response.status(500).send(err);
            }   
            
            return response.status(200).send(results)
        })    
        
   
})

router.get('/',(request, response) => {
    car_name = request.query.keyword
    database.query(
        
        'SELECT * FROM automobile WHERE brand LIKE?', [car_name], (err, results) => {
            if (err) {
                return response.status(500).send(err);
            }
            console.log(results)
           
          //Render the index template with the list of a blog posts
            
           return response.render('search', {searchs:results});
        })

   
})



module.exports = router;