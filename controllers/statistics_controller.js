var models = require('../models/models.js');

//Autoload- factoriza el codigo si ruta incluye :quizId
exports.publish = function (req, res) {
	var result={};
	models.Quiz.count({
			include: [{model: models.Comment,
					required:true}],
			distinct: true
		})
	.then(function (countNumPregSinComent) {
			result.countNumPregSinComent = countNumPregSinComent;
			return models.Quiz.count();})
	.then(function (countPreg) {
			result.countPreg = countPreg;
			res.render('statistics', {numpregsincoment: result.countNumPregSinComent,countPreg : result.countPreg });
			}).catch(function (error) { next(error);	});
};


