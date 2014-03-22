var CETOcorrencia = function(sequelize, DataTypes){
	return sequelize.define('CETOcorrencia', {
		  	id  : 		{type: DataTypes.INTEGER, allowNull : false }
			, endereco:	{type: DataTypes.STRING, allowNull : false }
			, numero: 	{type: DataTypes.STRING, allowNull : false }
			, latitude:  {type: DataTypes.FLOAT, allowNull : false }
			, longitude: {type: DataTypes.FLOAT, allowNull : false }
			, quantidade: {type: DataTypes.INTEGER, allowNull : false }		  
			, dataOcorrencia : {type: DataTypes.DATE, allowNull : false }
			, nivel : {type: DataTypes.INTEGER, allowNull : false }
		}
		,
		{
			tableName : 'CETOcorrencia'
	    	, timestamps : true
		}
	);
};

module.exports = CETOcorrencia;