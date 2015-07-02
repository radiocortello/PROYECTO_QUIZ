module.exports = function (sequelize, Datatypes) {
	return sequelize.define('Quiz', {
		pregunta:{
			type: Datatypes.STRING,
			validate: { notEmpty: {msg: '--> Falta pregunta'}}
		},
		respuesta: {
			type: Datatypes.STRING,
			validate: { notEmpty: {msg: '--> Falta respuesta'}}
		},
		tematica: {
			type: Datatypes.STRING,
			validate: { notEmpty: {msg: '--> Falta tematica'}}
		}		
	});
}
