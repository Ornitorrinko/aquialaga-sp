var models = require('../models')
	, Q = require('q')
    , CETOcorrencia = models.CETOcorrencia
	, UsuarioOcorrencia = models.usuarioOcorrencia;

function ocorrencias(){
	return{
		findByGeolocation: function(latitude, longitude, callback){
			var rangeToFindOcorrenciasKm = 10
			  , rangeToFindOcorrenciasDegree = rangeToFindOcorrenciasKm/111
			  , query = {
			  		where: {
			            latitude: {
			                gte: latitude - rangeToFindOcorrenciasDegree
			              , lt: latitude + rangeToFindOcorrenciasDegree
			            },
			            longitude: {
			              	gte: longitude - rangeToFindOcorrenciasDegree
			              , lt: longitude + rangeToFindOcorrenciasDegree
			            }
			  		}
			  	}
				, gettingOcorrenciasDaCET = CETOcorrencia.find(query)
				, gettingOcorrenciasDosUsuarios = UsuarioOcorrencia.find(query);

			Q.all([gettingOcorrenciasDaCET, gettingOcorrenciasDosUsuarios])
				.spread(function(ocorrenciasDaCET, ocorrenciasDosUsuarios){
					if(!ocorrenciasDaCET)
						ocorrenciasDaCET = [];

					if(!ocorrenciasDosUsuarios)
						ocorrenciasDosUsuarios = [];

					callback(null, [ocorrenciasDaCET, ocorrenciasDosUsuarios]);
				})
				.fail(function(error){
					callback(true, error);
				})
				.done();
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