var helpers = require('../helpers/index')
	, http = helpers.requestUrlReturn
	, config = helpers.config
	, YQL = require('yqlp')
	, url = require('url');

var weather = function (){
	return {
		consultar : function(callback) {

			YQL.exec("SELECT item.forecast FROM weather.forecast WHERE woeid = @woeid AND u='c'"
				, {woeid: 202344868}
				, function(error, response) {
			    if (error) {
			        console.log('Ops! Something wrong happened =(:', error);
			    } else {
			        var results = response.query.results;
			        console.log('response=>', response);
			    }
			});

			// callback(status, response);
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