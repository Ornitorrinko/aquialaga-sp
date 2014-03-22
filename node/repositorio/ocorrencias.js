var CETOcorrencia = require('./CETOcorrencia')
	, usuarioOcorrencia = require('./usuarioOcorrencia');

function ocorrencias(){
	return{
		findByGeolocation: function(latitude, longitude, callback){
			var db = require('./index').sequelize
				, query = 'select id, endereco, numero, latitude, longitude, quantidade\
					from CETOcorrencia
					where 	latitude = ?
					and 	longitude = ?';

			db
			.query(query)
				, null
				, {raw: true}
				, [latitude, longitude])
			.success(function(ocorrenciasDaCET){
				callback(false, ocorrenciasDaCET);
			})
			.error(function(error){
				callback(true, error);
			});
		}
		, salvar: function(ocorrencia){
			ocorrencia
				.save()
				.success(function(novaOcorrencia){
					callback(null, novaOcorrencia);
				})
				.error(function(error){
					callback(error, null);
				});
		}
	}
};

module.exports = ocorrencias;