var helper = require('../helpers/index')
	, maps = helper.maps
	, usuarioOcorrenciasDb = require('../repositorio/usuarioOcorrencias')
	, CETOcorrenciasDb = require('../repositorio/CETOcorrencia')
	, ocorrencias = require('../repositorio/ocorrencias');

var apiOcorrencias = function (model){	
	this.model = model;

	return {
		listar : function(callBack) {
			ocorrencias.findByAddress()
		},
		metodo2 : function( callBack ) {
		}		
	};
};

module.exports.apiRoutes = function () {
	return [
		{ httpMethod : 'get', route : '/ocorrencias/:lat/:long'
		, func : 
			function( req, callback ) {
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
		    function( req, callback ) {
		  		var api = new apiCorrida()
		  		api.corridaAguardandoRespostaMotoboy ( req.body.idUser , function( corrida ){
		  			callback ( utils.formaters.corridaSituacao( corrida ) )
		  		} )
		  	}
		}
	]
}()


