var helper = require('../helpers/index')
	, maps = helper.maps
	, usuarioOcorrencia = require('../repositorio/usuarioOcorrencias')
	, CETOcorrenciasDb = require('../repositorio/CETOcorrencia')
	, ocorrencias = require('../repositorio/ocorrencias');

var apiOcorrencias = function (model){	
	
	var self = this;

	this.model = model;

	return {
		listar : function(callback) {
			if(!self.model.latitude || !self.model.longitude)
				callback(['Wrong call, provide geolocation'], {});

			ocorrencias
				.findByGeolocation(self.model.latitude, self.model.longitude
					, function(err, data){

					});
		},
		reportar : function(callback) {
			var error = [];
			if(!self.model.latitude)
				error.push('Wrong call, provide latitude');

			if(!self.model.longitude)
				error.push('Wrong call, provide longitude');

			if(!self.model.level)
				error.push('Wrong call, provide level');

			if(error.length > 0)
				callback(error, {});

			var novaOcorrencia = usuarioOcorrencia.build({
				
			});

		}
	};
};

module.exports.apiRoutes = function () {
	return [
		{ httpMethod : 'get', route : '/ocorrencias/:lat/:long'
		, func : 
			function(req, callback) {
				var	params = req.params
					, latitude = params.latitude
					, longitude = params.longitude
					, model = {
						latitude: latitude
						, longitude: longitude
					}
					, api = new apiOcorrencias(model);

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
		    		, api = new apiOcorrencias(model);

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


