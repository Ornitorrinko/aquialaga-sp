var helpers = require('../helpers/index')
	, http = helpers.requestUrlReturn
	, config = helpers.config
	, url = require('url');

var weather = function (){
	return {
		consultar : function(callback) {
			http(config.apiEndpoints.yahooWeather, function(status, response){
				callback(status, response);
			});
		}
	};
};

module.exports.apiRoutes = function () {
	return [
		{ httpMethod:'get', route:'/tempo/previsao'
		, func : 
			function(req, callback) {
				var api = new weather();
				api.consultar(function(error, data) {
					if (error)
						callback({result : '0', message : data});
					else
						callback({data: data});
				});
			}
		}
	]
}()