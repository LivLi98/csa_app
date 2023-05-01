var express = require('express');
var router = express.Router();
const { authenticate } = require("../middlewares/auth");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/", authenticate, async (req, res) => {
})

module.exports = router;
