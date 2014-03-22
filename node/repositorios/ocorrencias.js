var models = require('../models')
    , CETOcorrencia = models.CETOcorrencia
	, usuarioOcorrencia = models.usuarioOcorrencia

function ocorrencias(){
	return{
		findByGeolocation: function(latitude, longitude, callback){
			CETOcorrencia
				.find({where: {"latitude": latitude, "longitude": longitude}})
				.success(function(ocorrenciasDaCET){
					if(!ocorrenciasDaCET)
						ocorrenciasDaCET = [];
					
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