
var express = require('express');
var router = express.Router();
var database = require('../database');



router.get('/',(request, response) => {
          
    response.render('team');
        
})



module.exports = router;