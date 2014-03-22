var helper = require('../helpers/index')
	, usuarioOcorrenciasDb = require('../repositorio/usuarioOcorrencias')
	, CETOcorrenciasDb = require('../repositorio/CETOcorrencia');

var apiOcorrencias = function (model) {	
	return {
		listar : function(callBack) {
			CETOcorrenciasDb.all()
		},
		metodo2 : function( callBack ) {
		}		
	}
}


module.exports.apiRoutes = function () {
	return [
		{ httpMethod : 'get', route : '/ocorrencias/:lat/:long'
		, func : 
			function( req, callback ) {
				var	params = req.params
					, latitude = params.latitude
					, longitude = params.longitude
					, api = new apiOcorrencias();

				api.listar()

				api.criar( model, function( error , corridasResponse ) {
					var result = {}
					
					if (error) {
						console.log('***error:',error)
						var response = { result : "0" }
						if (typeof error == "boolean") {
							if (corridasResponse.msg && corridasResponse.msg.messages )
								response.message = corridasResponse.msg.messages;
						} else {

							if (error.msg )
								response.message = error.msg.messages;
						}

						result = response
					} else {
						result =  corridasResponse
					}

					var i = utils.formaters.tryInt(result.id_corrida ? result.id_corrida : 0)
					if (i > 0 ) 
				  		api.corridaStatusPorId ( i , function( corridaDb ){
				  			result.corrida = utils.formaters.corridaSituacao( corridaDb ).corrida
				  			callback (  result )

				  		} )
				  	else
				  		callback( result )
				})
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


