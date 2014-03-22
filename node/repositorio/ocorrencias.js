var CETOcorrencia = require('./CETOcorrencia')
	, usuarioOcorrencia = require('./usuarioOcorrencias');

function ocorrencias(){
	return{
		findByAddress: function(address){
			var db = require('./index').sequelize
			, query = 'select id, endereco, numero, latitude, longitude, quantidade\
					 * from CETOcorrencia \
					 where endereco = ?';
					
			db
			.query(query
				, null
				, {raw: true}
				, [address])
			.success(function(ocorrenciasDaCET){
				callback(false, ocorrenciasDaCET);
			})
			.error(function(error){
				callback(true, error);
			});
		}
	}
};

module.exports = ocorrencias;