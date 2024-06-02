var express = require('express');
var router = express.Router();
var database = require('../database');

// Route to add a product to the cart
router.post('/create', (request, response) => {
    const { id } = request.body;
    console.log(id);
    database.query(
        'INSERT INTO cart(automobile_id, quantity) VALUES(?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1', [id], (err, results) => {
            if (err) {
                console.log('Error adding to cart:', err);
                return response.status(500).send(err);
            }
            return response.status(200).send(results);
        }
    );
});

// Route to retrieve cart data and display checkout page
router.get('/', (request, response) => {
    // Assuming 'request.session.user' contains information about the logged-in user
    if (request.session.user) {
        database.query(
            'SELECT * FROM cart INNER JOIN automobile ON cart.automobile_id = automobile.id', 
            (err, results) => {
                if (err) {
                    console.error('Error fetching data:', err);
                    return response.status(500).send('Error fetching data');
                }
                console.log(results);
                let sum = 0;
                results.forEach(item => {
                    sum += item.price * item.quantity; // Assuming 'price' and 'quantity' are columns in the 'automobile' and 'cart' tables respectively
                });
                response.render('checkout', { cart: results, total: sum });
            }
        );
    } else {
        response.render('login');
    }
});

module.exports = router;