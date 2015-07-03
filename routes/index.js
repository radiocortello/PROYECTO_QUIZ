var express = require('express');
var router = express.Router();
var quiz_controller = require('../controllers/quiz_controller');
var comment_controller = require('../controllers/comment_controller');
var session_controller = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { layout:false, titulo: 'QUIZ' });
});

//Autoload de comandos con :quizId
router.param('quizId', quiz_controller.load); //autoload :quizId
router.param('commentId', comment_controller.load); //autoload :commentId

// Definición de rutas de sesion
router.get('/login', session_controller.new);
router.post('/login', session_controller.create);
router.get('/logout', session_controller.destroy);


router.get('/quizes/', quiz_controller.index);
router.get('/quizes/:quizId(\\d+)', quiz_controller.show)
router.get('/quizes/:quizId(\\d+)/answer', quiz_controller.answer);
router.get('/quizes/new',session_controller.loginRequired, quiz_controller.new)
router.post('/quizes/create',session_controller.loginRequired, quiz_controller.create);
router.get('/quizes/:quizId(\\d+)/edit',session_controller.loginRequired, quiz_controller.edit);
router.put('/quizes/:quizId(\\d+)',session_controller.loginRequired, quiz_controller.update);
router.delete('/quizes/:quizId(\\d+)',session_controller.loginRequired, quiz_controller.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', comment_controller.new);
router.post('/quizes/:quizId(\\d+)/comments', comment_controller.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', session_controller.loginRequired, comment_controller.publish);

router.get('/author', function (req,res,next) {
  res.render('author')
});
module.exports = router;
