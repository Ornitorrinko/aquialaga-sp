var CETOcorrencia = function(sequelize, DataTypes){
	return sequelize.define('CETOcorrencia', {
		  	id  : 		{type: DataTypes.INTEGER, allowNull : false, autoIncrement : true, primaryKey : true }
			, endereco:	{type: DataTypes.STRING, allowNull : false }
			, numero: 	{type: DataTypes.STRING, allowNull : true }
			, latitude:  {type: DataTypes.FLOAT, allowNull : true }
			, longitude: {type: DataTypes.FLOAT, allowNull : true }
			, quantidade: {type: DataTypes.INTEGER, allowNull : false }		  
			, dataOcorrencia : {type: DataTypes.DATE, allowNull : true }
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