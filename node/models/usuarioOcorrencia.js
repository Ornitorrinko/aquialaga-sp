var usuarioOcorrencia = function(	sequelize, DataTypes ){

	return sequelize.define('usuarioOcorrencia', {
		  id  : { type : DataTypes.INTEGER, allowNull : false, autoIncrement: true, primaryKey: true }
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

module.exports = usuarioOcorrencia;