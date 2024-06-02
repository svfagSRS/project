var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function(req, res, next) {
    res.render('registration');
});

router.post('/create', function(req, res, next) {
    console.log('called');
    var { username, email, pass } = req.body;

    // Check if required fields are provided and not empty
    if (!username || !email || !pass) {
        return res.status(400).send('username, email, and password are required.');
    }

    database.query('INSERT INTO users(username, email, pass) VALUES(?,?,?)', [username, email, pass], (err, results) => {
        if (err) {
            console.log('Error in the house:', err);
            return res.status(500).send('Internal server error.');
        }

        // Store user information in session
        req.session.user = { username: username, email: email, pass: pass };

        // Redirect user to welcome page
        res.redirect('../welcome?id=' + encodeURIComponent(email));
    });
});

module.exports = router;