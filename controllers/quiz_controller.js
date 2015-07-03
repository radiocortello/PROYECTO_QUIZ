var models = require('../models/models.js');

//Autoload- factoriza el codigo si ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
	models.Quiz.find({
			where: {id: Number(quizId)},
			include: [{model: models.Comment}]
		}).then(
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
	if (req.query.search || req.query.tematica){
		models.Quiz.findAll({where:{
				pregunta: {$like:'%'+ req.query.search	+'%'},
				tematica: {$like:'%'+ req.query.tematica +'%'}
				}
			}).then(function (quizes) {
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
		{pregunta: "", respuesta: "", tematica: ""});
	res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create
exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function (err) {
		if(err){
			res.render('quizes/new', {quiz: quiz, errors: err.errors})
		} else {
		//guarda en DB los campos pregunta y respuesta de quiz
		quiz.save({fields: ["pregunta", "respuesta", "tematica"]}).then(function () {
			res.redirect('/quizes');
		});
		}
	});
};

//GET /quizes/:quizId/edit
exports.edit = function (req, res) {
	res.render('quizes/edit', {quiz: req.quiz, errors:[]});
};

//PUT /quizes/:quizId
exports.update = function (req,res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tematica = req.body.quiz.tematica;
		req.quiz.validate().then(function (err) {
		if(err){
			res.render('quizes/new', {quiz: req.quiz, errors: err.errors})
		} else {
		//guarda en DB los campos pregunta y respuesta de quiz
		req.quiz.save({fields: ["pregunta", "respuesta", "tematica"]}).then(function () {
			res.redirect('/quizes');
		});
		}
	});
};

//DELETE /quizes/:quizId
exports.destroy = function (req, res) {
	req.quiz.destroy().then(function () {
		res.redirect('/quizes');
	}).catch(function (error) {next(error);});
};