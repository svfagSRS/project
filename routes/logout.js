
var express = require('express');
var router = express.Router();
var database = require('../database');




router.get('/',(request, response) => {
          
    response.render('logout');
        
})

router.get('/action', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    return res.status(200).send('')
});




module.exports = router;