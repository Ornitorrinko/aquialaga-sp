var helpers = require('../helpers/index')
	, http = helpers.requestUrlReturn
	, config = helpers.config
	, YQL = require('yqlp')
	, url = require('url');

var weather = function (){
	var self = this;

	return {
		consultar : function(callback) {
			YQL.exec("SELECT * FROM weather.forecast WHERE woeid = @woeid AND u='c'"
				, {woeid: 26798778}
				, function(error, response) {
			    if (error)
			    	callback(true, error);
			    else {
			        callback(null, response.query.results.channel.item.forecast[0]);
			    }
			});
		}
	};
};

module.exports.apiRoutes = function () {
	return [
		{ httpMethod:'get', route:'/saopedro/previsao'
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