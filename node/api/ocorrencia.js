var helpers = require('../helpers/index')
	, maps = helpers.maps
	, usuarioOcorrencia = require('../models').usuarioOcorrencia
	, ocorrencias = require('../repositorios/ocorrencias');

var apiOcorrencia = function (model){	
	
	var self = this;

	this.model = model;

	return {
		listar : function(callback) {
			if(!self.model.latitude || !self.model.longitude)
				callback(['Wrong call, provide geolocation'], {});

			ocorrencias
				.findByGeolocation(self.model.latitude, self.model.longitude
					, function(err, data){
						console.log('data=>', data);
					});
		},
		reportar : function(callback) {
			var error = [];
			if(!self.model.latitude)
				error.push('Wrong call, provide latitude');

			if(!self.model.longitude)
				error.push('Wrong call, provide longitude');

			if(!self.model.nivel)
				error.push('Wrong call, provide level');

			if(error.length > 0)
				callback(error, {});

			var novaOcorrencia = usuarioOcorrencia.build({
				latitude: self.model.latitude
				, longitude: self.model.longitude
				, nivel: self.model.nivel
			});
			
			ocorrencias.salvar(novaOcorrencia
				, function(err, data){
					if(err)
						callback(err, {});
					else
						callback(null,data);
				});
		}
	};
};

module.exports.apiRoutes = function () {
	return [
		{ httpMethod : 'get', route : '/ocorrencias/:lat/:lng'
		, func : 
			function(req, callback) {
				var	params = req.params
					, latitude = params.lat
					, longitude = params.lng
					, model = {
						latitude: latitude
						, longitude: longitude
					}
					, api = new apiOcorrencia(model);

				api.listar(function(error, data) {
					if (error)
						callback({result : '0', message : data});
					else
						callback({data: data});
				});
			}
		},	
		{ httpMethod : 'post', route : '/ocorrencias'
		, func : 
		    function(req, callback) {
		    	var model = req.body
		    		, api = new apiOcorrencia(model);

		    	api.reportar(function(err, data){
		    		if(err)
		    			callback({result: 0, message: err});
		    		else
		    			callback({data: data});
		    	});
		  	}
		}
	]
}()


