var models = require('../models/models.js');

//Autoload- factoriza el codigo si ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function (quiz) {
			if (quiz){
			req.quiz = quiz;
			next();	
			} else {next(new Error('No existe quizId='+quizId));}
		}
	).catch(function (error) { next(error);	});
};

//GET /quizes
exports.index = function (req, res) {
	if (req.query.search){
		models.Quiz.findAll({where:['pregunta like ?', '%' + req.query.search.replace(" ", "%") + '%']}).then(function (quizes) {
			res.render('quizes/index', {quizes: quizes})
		}).catch(function (error) { next(error);});
	} else {
	models.Quiz.findAll().then(function (quizes) {
		res.render('quizes/index', {quizes: quizes});
	}).catch(function (error) { next(error);});
	}
};

//GET/quizes/:quizId
exports.show = function (req, res) {
			res.render('quizes/show', {quiz: req.quiz});
};


//GET /quizes/:quizId/answer
exports.answer = function (req, res) {
		if (req.query.respuesta === req.quiz.respuesta){
		res.render('quizes/answer', {quiz: req.quiz, resultado:'correcto'});
		} else{
			res.render('quizes/answer', {quiz: req.quiz, resultado:'incorrecto'});
		}
	};
	
//GET /quizes/new
exports.new = function (req, res) {
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta: "pregunta", respuesta: "respuesta"});
	res.render('quizes/new', {quiz: quiz});
};

//POST /quizes/create
exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	
	//guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function () {
		res.redirect('/quizes');
	});
};