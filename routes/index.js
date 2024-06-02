var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  if (!post) {
      res.status(404).send('Post not found');
  }
  else {
      res.render('post', { post });
  }
});




router.post('/create', (req, res) => {
//Implement CREATE operation
const { name, address } = req.body;
mydb.query('INSERT INTO Customers (name, address) VALUES (?, ?)', [name, address], (err, result) => {
  if(err) {
      return res.status(500).send(err);
  }
      res.redirect('/');
});
});


router.get('/edit/:id', (req, res) => {
//Implement EDIT operation
const postId = parseInt(req.params.id);
const post = posts.find(post => post.id === postId);
if (!post) {
  res.status(404).send('Item not found');
}
else {
  res.render('edit', { post });
}
});


router.post('/update/:id', (req, res) => {
//Implement UPDATE operation
const postId = parseInt(req.params.id);
const { title, content } = req.body;
const postIndex = posts.findIndex(post => post.id === postId);
if (postIndex === -1) {
  res.status(404).send('Item not found');
}
else{
  posts[postIndex] = { id: postId, title, content };
  res.redirect('/');
}
});


router.get('/delete/:id', (req, res) => {
//Implement DELETE operation
const postId = parseInt(req.params.id);
posts = posts.filter(post => post.id !== postId);
res.redirect('/');
});

module.exports = router;