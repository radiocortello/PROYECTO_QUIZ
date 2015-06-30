var express = require('express');
var router = express.Router();
var quiz_controller = require('../controllers/quiz_controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { layout:false, titulo: 'QUIZ' });
});
router.get('/quizes/', quiz_controller.index);
router.get('/quizes/:quizId(\\d+)', quiz_controller.show)
router.get('/quizes/:quizId(\\d+)/answer', quiz_controller.answer);
router.get('/author', function (req,res,next) {
  res.render('author')
});
module.exports = router;
