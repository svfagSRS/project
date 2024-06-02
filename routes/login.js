
var express = require('express');
var router = express.Router();
var database = require('../database');




router.get('/',(request, response) => {

   
    response.render('login');
        
})



router.post('/create',(request, response) => {

    var {email, pass} = request.body
    database.query('SELECT * FROM users WHERE email =? AND pass=?', [email, pass],  (err, results) => {
        if (err) {
            console.log('error in the house')
            return response.status(500).send(err);
        }  

        console.log(results.length)
        
        if(results.length == 0){
            console.log('oops')
            return response.status(201).send(results)
        }else{
    
            var newUser = {email: request.body.email, pass: request.body.pass};
            request.session.user = newUser
            console.log('loops')
            return response.status(200).send(results)
        
        }
        
    }) 

})





module.exports = router;