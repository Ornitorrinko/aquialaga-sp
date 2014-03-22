var usuarioOcorrencia = function(	sequelize, DataTypes ){

	return sequelize.define('usuarioOcorrencia', {
		  id  : { type : DataTypes.INTEGER, allowNull : false }
		  , latitude: { type : DataTypes.FLOAT, allowNull : false }
		  , longitude: { type : DataTypes.FLOAT, allowNull : false }
		  , nivel: { type : DataTypes.INTEGER, allowNull : false }
		}
		,
		{ 
			tableName : 'usuarioOcorrencia'
	    	, timestamps : true
		}
	)
}

module.exports = usuarioOcorrencias;