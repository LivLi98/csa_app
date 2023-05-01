var express = require('express');
var router = express.Router();
const { authenticate } = require('../middlewares/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/', authenticate, async (req, res) => {
  
});

module.exports = router;
