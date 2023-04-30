var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, async (req, res) => {
  
});

module.exports = router;
