var helpers = require('../helpers/index')
	, usuarioOcorrenciasDb = require('../repositorio/usuarioOcorrencias')
	, CETOcorrenciasDb = require('../repositorio/CETOcorrencia')
	, sequelize = require('../repositorio').sequelize
	, config = helpers.config

	var sql = "SELECT str_to_date(ocorrencias.chegada, '%d/%m/%Y %H:%i') data\
						,ocorrencias.LOCALDAOCORRENCIA\
						,ocorrencias.ALTURANUMERICA\
						,CETOcorrencias.latitude\
						,CETOcorrencias.longitude\
						,count(*) quantidade\
				FROM ocorrencias\
				 left join CETOcorrencia as CETOcorrencias  on (CETOcorrencias.endereco = ocorrencias.LOCALDAOCORRENCIA \
				  and ocorrencias.ALTURANUMERICA = CETOcorrencias.numero)
				where dataImportacao is null\
					  and ocorrencias.codigo = "+ config.parametrosImportacao.nivelAlagamentoPadrao + "\
				group by str_to_date(ocorrencias.chegada, '%d/%m/%Y %H:%i')\
				         ,ocorrencias.LOCALDAOCORRENCIA\
				         ,ocorrencias.ALTURANUMERICA\
						  ,CETOcorrencias.latitude\
						  ,CETOcorrencias.longitude\
				limit 10";

	var updCMD = "update ocorrencias set\
	                 dataImportacao = NOW()\
	                 where dataImportacao is null and LOCALDAOCORRENCIA = ? and  ALTURANUMERICA = ?"

    var execUpd = function( values ){
    	sequelize.connection.query(updCMD, [values.LOCALDAOCORRENCIA, values.ALTURANUMERICA], function(){
    		console.log('1:', JSON.stringidfy(arguments))
    	})
    }

	sequelize.query( sql, null, { raw : true } , [] ).success(function ( items ) {
		var _
		items.forEach( function ( item ) {
		
			CETOcorrenciasDb.findOrCreate({ endereco : items.LOCALDAOCORRENCIA
				                          , numero : items.ALTURANUMERICA
				                          , quantidade : items.quantidade
				                          , dataOcorrencia : items.data
				                          , longitude : item.longitude
				                          , latitude : item.latitude
				                          , nivel : config.parametrosImportacao.nivelAlagamentoPadrao
				                          , })
			.error(function(){
				;
			}).success( function( row, created ){
				execUpd( item )
				if (!created) {
					row.updateAttributes( { quantidade : row.quantidade + item.quantidade } )
					.error(function(){

					})
				}
			})
		}

module.exports.api = function(){

}
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
