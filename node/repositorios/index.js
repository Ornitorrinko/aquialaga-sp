var mysql = require('mysql');
var config = require('../config')
var connectionParams = { host : config.db.host
	                    , user :config.db.user
	                    , password : config.db.password
						, port : config.db.port
						, database : config.db.instance
						};
var pool  = mysql.createPool(connectionParams);

module.exports.createConnectionEx = function (cb) {
	pool.getConnection(function(err, connection) {
		connection.config.queryFormat = function (query, values) {
		  if (!values) return query;
		  return query.replace(/\:(\w+)/g, function (txt, key) {
		    if (values.hasOwnProperty(key)) {
		      return this.escape(values[key]);
		    }
		    return txt;
		  }.bind(this));
		};
		cb(connection)
	});


}

module.exports.createConnection = function () {
	var connection = mysql.createConnection(connectionParams);
	
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



