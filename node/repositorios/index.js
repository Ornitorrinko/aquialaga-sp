var config = require('../config')

module.exports.createConnection = function () {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({ host : config.db.host
		                                    , user :config.db.user
		                                    , password : config.db.password
											, port : config.db.port
											, database : config.db.instance
											});
	return connection
}
