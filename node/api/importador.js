

var helpers = require('../helpers')
    , mysql  = require('mysql')
    , models = require('../models')
	, config = helpers.config
	, CETOcorrencia = models.CETOcorrencia
	;



var _sql =' SELECT'
		 +' str_to_date(ocorrencia.CHEGADA, "%d/%m/%Y %H:%i") AS CHEGADA,'
		 +' ocorrencia.LOCALDAOCORRENCIA  LOCALDAOCORRENCIA,'
		 +'    ocorrencia.ALTURANUMERICA AS ALTURANUMERICA,'
		 +'    cetocorrencia.latitude AS latitude,'
		 +'    cetocorrencia.longitude AS longitude,'
		 +'    count(0) AS quantidade,'
		 +'    ocorrencia.CODIGO AS codigo'
		 +' FROM ocorrencia '
		 +'   left join CETOcorrencia as cetocorrencia on( cetocorrencia.endereco = ocorrencia.LOCALDAOCORRENCIA '
		 +'   	                      and ocorrencia.ALTURANUMERICA = cetocorrencia.numero )'
		 +' where ocorrencia.dataimportacao is null '
		 +'   and ocorrencia.CODIGO = ' + config.parametrosImportacao.codigoAlagamento
		 +'    '
		 +' group by ocorrencia.CHEGADA'
		 +'         , ocorrencia.LOCALDAOCORRENCIA'
		 +'         , ocorrencia.ALTURANUMERICA'
		 +'         , cetocorrencia.latitude'
		 +'         , cetocorrencia.longitude'
		 +' limit 10000'
		 ;
	

	var _updCMD = "update ocorrencia set dataImportacao = NOW()\n"
	              +"where dataImportacao is null and LOCALDAOCORRENCIA = :LOCALDAOCORRENCIA\n"
	              +"and (   (:ALTURANUMERICA is null     and ALTURANUMERICA is :ALTURANUMERICA)\n"
	              +"	 or (:ALTURANUMERICA is not null and ALTURANUMERICA = :ALTURANUMERICA )\n"
	              +")"

var _connection = require('../repositorios').createConnection()
var _importando = false
var Importador = function (){
	return {
		 updateOcorrencia : function( values ) {
		    _connection.query( _updCMD, values)

		 },
		 importarOcorrencia : function( i, rows ){
		 	var self = this
		 	if (i < rows.length){
		 		self.importar(i+1, rows)
		 	}

		 }
		 ,importar : function() {
		 	var self = this
			if (_importando) return;
			_importando = true;
		    
			_connection.query(_sql, function(err, rows) {
				importarOcorrencia( 0, rows, function(){
					_importando = false;
				})
		    });
	
		    /*
		    _connection.query( _sql, 
			sequelize.query(_sql, null, {raw : true} , [config.parametrosImportacao.codigoAlagamento])
			
			sequelize.query(_sql, null, {raw : true} , [config.parametrosImportacao.codigoAlagamento])

			.error(function(){
		    	_importando--;
				console.log('errors:', JSON.stringify(arguments))
			})
			.success(function ( items ) {
		    	_importando--;
				items.forEach( function ( item ) {
				})
			})*/
		},

		preencherLatLng : function(){

		}
	}

}	
	

/*

module.exports.api = Importador

module.exports.apiRoutes = function () {
	return []
}()

var helpers = require('../helpers')
    , mysql  = require('mysql')
    , models = require('../models')
	, config = helpers.config
	, CETOcorrencia = models.CETOcorrencia
	, sequelize = models.sequelize;

	var _sql =  'select \
				str_to_date(CHEGADA,"%d/%m/%Y %H:%i") data,\
	            LOCALDAOCORRENCIA,\
	            ALTURANUMERICA,\
	            quantidade,\
	            latitude,\
	            longitude,\
	            codigo\
	            from ocorrencia_view\
	            limit 100';

	var _updCMD = "update ocorrencia set dataImportacao = NOW()\n"
	              +"where dataImportacao is null and LOCALDAOCORRENCIA = ?\n"
	              +"and (     (? is null     and ALTURANUMERICA is null )\n"
	              +"	   or (? is not null and ALTURANUMERICA = ? )\n"
	              +")"

var _connection = require('../repositorios').createConnection()
var _importando = 0
var Importador = function (){
	return {
		importar : function() {
			if (_importando > 0) return;

		    var execUpd = function( values ){

				var cmd = mysql.format(_updCMD, [ values.LOCALDAOCORRENCIA
					                            , values.ALTURANUMERICA
					                            , values.ALTURANUMERICA
					                            , values.ALTURANUMERICA
					                            ]);
		    	_connection.query( cmd, function(){
		    		console.log('***', [],JSON.stringify(arguments));
		    	} )
		    }


			sequelize.query(_sql, null, {raw : true} , [config.parametrosImportacao.codigoAlagamento])

			.error(function(){
		    	_importando--;
				console.log('errors:', JSON.stringify(arguments))
			})
			.success(function ( items ) {
		    	_importando--;
				items.forEach( function ( item ) {
					CETOcorrencia.findOrCreate({ endereco : item.LOCALDAOCORRENCIA
					                          , numero : item.ALTURANUMERICA
					                          , quantidade : item.quantidade
					                          , dataOcorrencia : item.data
					                          , longitude : item.longitude
					                          , latitude : item.latitude
					                          , nivel : config.parametrosImportacao.nivelAlagamentoPadrao
					                          , })
					.error(function(){
						console.log(JSON.stringify(arguments));
					}).success( function( row, created ){
						execUpd( item )
						if (!created) {
							row.updateAttributes( { quantidade : row.quantidade + item.quantidade } )
							.error(function(){
								console.log('2:', JSON.stringify(arguments))
							})
						}
					})
				})
			})
		},

		preencherLatLng : function(){

		}
	}

}	




module.exports.api = Importador

module.exports.apiRoutes = function () {
	return []
}()
*/

/*connection.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results) {
  // ...

});

var post  = {id: 1, title: 'Hello MySQL'};
var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
  // Neat!
});
cons

User.findOrCreate({username: "johny",password: "pass",email: "johny93[###]example.com"})
.success(function(user, created){
    console.log(user.values);
    res.send(200);
})
.error(function(err){
   console.log('Error occured' + err);
})


				}


			})


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});




var apiOcorrencias = function (model) {
	var gm = require('googlemaps');
	gm.geocode(fullAdressString, function(err2, data){
	try{
	  self.lat = data.results[0].geometry.location.lat;
	  self.lng = data.results[0].geometry.location.lng; 
	}catch(e){
		self.errors = ['Endereço informado invalido'];
	};

	var _ = require('underscore'),
    gm = require('googlemaps');
    rangeToFindUnidadesKm = 10, 
    rangeToFindUnidadesDegree = rangeToFindUnidadesKm/111,
    gm.geocode(params.search, function(err, data){
        try{
          var geolocation = data.results[0].geometry.location;
          var query = {
            lat: {
                gte: geolocation.lat - rangeToFindUnidadesDegree
              , lt:geolocation.lat + rangeToFindUnidadesDegree
            },
            lng:{
              gte: geolocation.lng - rangeToFindUnidadesDegree
              , lt:geolocation.lng + rangeToFindUnidadesDegree
            }
          };

          var limit = 10,
              skip  = limit * params.page || 0;

          geddy.model.Endereco.all(query, {skip: skip, limit: limit}, function(err, enderecos){
            if(err) throw err;
            var unidades = [],
                idsUnidades = _.pluck(enderecos, 'unidadeId');

            geddy.model.Unidade._buildNotArchivedUnidadesWithQuadras(idsUnidades, 0, unidades, function(unidades){
              params.searchGeo = geolocation;
              self.respond({
                params: params
              , unidades: unidades
              }, {
                template: '/unidades/list'
              });
            });
          });
      }
      catch(e){
        self.respond({
          params: params
        , unidades: null
        }, {
          template: '/unidades/list'
        });
      }
    }, 'false');

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

*/
