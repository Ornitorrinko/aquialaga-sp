var CETOcorrencia = function(sequelize, DataTypes){

	return sequelize.define('CETOcorrencia', {
		  	id  : 		{type: DataTypes.INTEGER, allowNull : false }
			, endereco:	{type: DataTypes.STRING, allowNull : false }
			, numero: 	{type: DataTypes.STRING, allowNull : false }
			, latitude:  {type: DataTypes.INTEGER, allowNull : false }
			, longitude: {type: DataTypes.INTEGER, allowNull : false }
			, quantidade: {type: DataTypes.INTEGER, allowNull : false }		  
		}
		,
		{
			tableName : 'CETOcorrencia'
	    	, timestamps : true
		}
	);
};

module.exports = CETOcorrencia;