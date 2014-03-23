var mysql = require('mysql');
var config = require('../config')

module.exports.createConnection = function () {
	var connection = mysql.createConnection({ host : config.db.host
		                                    , user :config.db.user
		                                    , password : config.db.password
											, port : config.db.port
											, database : config.db.instance
											});
	
	connection.config.queryFormat = function (query, values) {
	  if (!values) return query;
	  return query.replace(/\:(\w+)/g, function (txt, key) {
	    if (values.hasOwnProperty(key)) {
	      return this.escape(values[key]);
	    }
	    return txt;
	  }.bind(this));
	};

	return connection
}



