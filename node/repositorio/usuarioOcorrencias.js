var usuarioOcorrencias = function(	sequelize, DataTypes ){

	return sequelize.define('usuarioOcorrencias', {
		  id  : { type : DataTypes.INTEGER, allowNull : false }
		}
		,
		{ 
			tableName : 'usuarioOcorrencias'
	    	, timestamps : true
		}
	)
}

module.exports = usuarioOcorrencias;