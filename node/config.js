var path = require('path')
var environments = { 
	development	: {	session : {secret:'br.com.aquialagasp.1234567890QWERTY'}
				,	socketPortAPI : 3001
				,	appAddress : '127.0.0.1:3000'
				,	socketPort : process.env.PORT || 3000
				,	socketHost : '127.0.0.1'
				,	env : global.process.env.NODE_ENV || 'dev' 

				,	mongoUrl:  'mongodb://localhost/dev'
				, 	mongoSessionCollection : 'session'
				,   parametrosImportacao : { codigoAlagamento : 302, nivelAlagamentoPadrao : 1 }
				,   jobs : [ { name : 'Obter dados CET'
				             , interval : 1 * 60 * 10 // 10 minutos
				             , method : 
				             	function() { 
				             		
				             		var api = new (require('./api/importador').api)()
				             		api.importar()

				               	} 
							  } 
						   ]
				,	apiNames : ['ocorrencia']
				,	db :    { host 		: "179.184.209.219" 
							, user 		: "aqui-alaga-sp"
							, password 	: "ornitorrinko"
							, instance	: "aquialaga-sp"
							, port    	: 3306
							, pool    	: { maxConnections : 15, maxIdleTime: 30}
							, type    	: "mysql"
							, logger    : function(){

							  }
							}
				, 	keys: {
						googleMaps: ""
						, yahooWeather: ""
					}
				}
,	production	: {	session : {secret:'br.com.aquialagasp.1234567890QWERTY'}
				,	socketPortAPI : 3001
				,	appAddress : '127.0.0.1:3000'
				,	socketPort : process.env.PORT || 3000
				,	socketHost : '127.0.0.1'
				,	env : global.process.env.NODE_ENV || 'dev' 

				,	mongoUrl:  'mongodb://localhost/dev'
				, 	mongoSessionCollection : 'session'
				,   jobs : [ ]
				,	apiNames : ['ocorrencia']
				,	db :  { host 		: "179.184.209.219" 
							, user 		: "aqui-alaga-sp"
							, password 	: "ornitorrinko"
							, instance	: "aquialaga-sp"
							, port    	: 3306
							, pool    	: { maxConnections : 15, maxIdleTime: 30}
							, type    	: "mysql"
							}
				}
}


var program = require('commander')

program
  .version('0.0.2')
  .option('-e, --environment [env]', 'specify environment production or development', 'development')
  .option('-j, --job', 'Jobs')
  .parse(process.argv)


console.log('******', program.environment ,":" ,environments[program.environment] )
var config = environments[program.environment]
module.exports = config

if (program.job) {
	var jobs = config.jobs || []
	function getJobAsFunc(job) {
		return function() {
			console.log('job.name:', job.name)
			job.method()
		}
	}

	for (var i = jobs.length - 1; i >= 0; i--)
		jobs[i].funcInterval = setInterval( getJobAsFunc ( jobs[i] )
	                                      , jobs[i].interval || 1000 * 60 * 10 
	                                      )
}