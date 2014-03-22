var helpers = require('../helpers/index')
	, maps = helpers.maps
	, url = require('url')
	, usuarioOcorrencia = require('../models').usuarioOcorrencia
	, ocorrencias = require('../repositorios/ocorrencias')();

var apiOcorrencia = function (model){	
	
	var self = this;

	this.model = model;

	return {
		listar : function(callback) {
			if(!self.model.latitude || !self.model.longitude){
				callback(true, 'Wrong call, provide geolocation data. Ex.: url/{lat}/{lng}');
				return;
			}

			ocorrencias
				.findByGeolocation(self.model.latitude, self.model.longitude
					, function(err, data){
						if(err)
							callback(true, err);
						else
							callback(null, data);
					});
		}
		, reportar : function(callback) {
			var error = [];
			if(!self.model.latitude)
				error.push('Wrong call, provide latitude');

			if(!self.model.longitude)
				error.push('Wrong call, provide longitude');

			if(!self.model.nivel)
				error.push('Wrong call, provide level');

			if(error.length > 0){
				callback(true, error);
				return;
			}

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
		, geolocation: function(callback){
			var latitude = self.model.params.lat
				, longitude = self.model.params.lng
				, address = self.model.params.address;


			if(latitude && longitude){
				maps.byGeolocation(latitude, longitude, function(err, data){
					if(err)
						callback(true, err);
					else
						callback(null, data);
				});
				return;
			}

			if(address){
				maps.byAddress(address, function(err, data){
					if(err){
						callback(true, data);
					}
					else
						callback(null, data);
				});
				return;
			}

			if(!latitude && !longitude){
				callback(true, 'Wrong call! Ex.: ?lat=0000.00&lng=-00.0111,12');
				return;
			}

			if(!address){
				callback(true, 'Wrong call! Ex.: ?address=Rua Boa Vista, 136, Sao Paulo, SP, BR');
				return;	
			}
		}
	};
};

module.exports.apiRoutes = function () {
	return [
		{ httpMethod:'get', route:'/ocorrencias/:lat/:lng'
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
		}
		, { httpMethod:'post', route:'/ocorrencias'
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
		, { httpMethod:'get', route:'/get-geolocation'
		, func : 
		    function(req, callback) {
		    	var parts = url.parse(req.url, true)
				  , params = parts.query
				  , model = {
				  	params: params
				  }
				  , api = new apiOcorrencia(model);

				api.geolocation(function(error, data) {
					if (error){
						callback({result : '0', message : data});
					}
					else
						callback({data: data});
				});
		  	}
		}
	]
}()