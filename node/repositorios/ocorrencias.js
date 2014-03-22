var models = require('../models')
    , CETOcorrencia = models.CETOcorrencia
	, usuarioOcorrencia = models.usuarioOcorrencia

function ocorrencias(){
	return{
		findByGeolocation: function(latitude, longitude, callback){
			var db = models.sequelize
				, query = 'select id, endereco, numero, latitude, longitude, quantidade\
					from CETOcorrencia\
					where 	latitude = ?\
					and 	longitude = ?';

			db
			.query(query
				, null
				, {raw: false}
				, [latitude, longitude])
			.success(function(ocorrenciasDaCET){
				callback(false, ocorrenciasDaCET);
			})
			.error(function(error){
				callback(true, error);
			});
		}
		, salvar: function(ocorrencia, callback){
			ocorrencia
				.save()
				.success(function(novaOcorrencia){
					callback(null, novaOcorrencia);
				})
				.error(function(error){
					callback({error: error.code}, null);
				});
		}
	}
};

module.exports = ocorrencias;