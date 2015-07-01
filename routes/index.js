var express = require('express');
var router = express.Router();
var quiz_controller = require('../controllers/quiz_controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { layout:false, titulo: 'QUIZ' });
});
router.param('quizId', quiz_controller.load); //autoload :quizId
router.get('/quizes/', quiz_controller.index);
router.get('/quizes/:quizId(\\d+)', quiz_controller.show)
router.get('/quizes/:quizId(\\d+)/answer', quiz_controller.answer);
router.get('/quizes/new', quiz_controller.new)
router.get('/author', function (req,res,next) {
  res.render('author')
});
router.post('/quizes/create', quiz_controller.create);
module.exports = router;
