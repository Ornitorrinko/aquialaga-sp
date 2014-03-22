var  express = require('express')
	, http = require('http')
	, config = require('./config')
	;
  
require('./helpers')
require('./repositorios/index')

var app = express();
exports.app = app

app.configure(function(){
	
	app.use( express.compress({ filter: function (req, res) {
		return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
	}, level: 9 }))
  
	app.set('port', config.socketPortAPI)
	app.use(express.cookieParser())
	app.use(express.bodyParser())
	app.use(express.methodOverride())
	app.use(express.session(config.session))
	app.use(app.router);

});



app.configure('development', function(){
	app.use(express.logger('dev'))
})

app.configure('production', function(){
	app.use(express.logger('production'))
})

require('./api/api.js').createRoutes( app )

app.get('/v1/ping/:me', function(req, res){
	res.json( { echo : req.params.me } )
})

var server = http.createServer( app )

server.listen( app.get('port'), function() {
 	console.log("API server listening on port " + app.get('port'))
})

