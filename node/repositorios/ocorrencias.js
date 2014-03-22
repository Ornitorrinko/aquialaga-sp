var models = require('../models')
	, Q = require('q')
    , CETOcorrencia = models.CETOcorrencia
	, UsuarioOcorrencia = models.usuarioOcorrencia

function ocorrencias(){
	return{
		findByGeolocation: function(latitude, longitude, callback){

			var rangeToFindUnidadesKm = 10
			  , rangeToFindUnidadesDegree = rangeToFindUnidadesKm/111
			  , query = {
			  		where: {
			            latitude: {
			                gte: latitude - rangeToFindUnidadesDegree
			              , lt: latitude + rangeToFindUnidadesDegree
			            },
			            longitude: {
			              	gte: longitude - rangeToFindUnidadesDegree
			              , lt: longitude + rangeToFindUnidadesDegree
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

					callback(false, {CET: ocorrenciasDaCET
						, Usuarios: ocorrenciasDosUsuarios
					});
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