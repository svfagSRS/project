var express = require('express');
var router = express.Router();
var database = require('../database');

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login'); // Redirect to login page if user is not authenticated
    }
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
    username = req.session.user.email; // Assuming email is stored in session after login
    console.log(username);
    res.render('welcome', { customer: username });
});

router.patch('/update-user', isAuthenticated, function(req, res, next) {
    var { newPass, email } = req.body;

    database.query('UPDATE users SET pass = ? WHERE email = ?', [newPass, email], (err, results) => {
        if (err) {
            console.log('Error updating password:', err);
            return res.status(500).send('Error updating password');
        }

        // Check if any rows were affected by the update query
        if (results.affectedRows > 0) {
            // Password updated successfully
            req.session.user.pass = newPass; // Update password in the session
            return res.status(200).send('Password changed successfully');
            
        } else {
            // No rows were affected (possibly user not found)
            return res.status(404).send('User not found or password not updated');
        }
    });
});

module.exports = router;