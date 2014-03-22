var config = require('../config')
var Sequelize = require('sequelize')
var sequelize = new Sequelize	(	config.db.instance
										,	config.db.user
										,	config.db.password
										, 	{	host    : config.db.host
											, 	port    : config.db.port
											, 	dialect : config.db.type
											, 	sync: { force: false } 
											, 	define : { timestamps: false }
											, 	timestamps: false
											, 	freezeTableName: true
											, 	logging: config.db.logger

											})



var models = [ 'usuarioOcorrencia' , 'CETOcorrencia']

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});


sequelize.sync().complete(function(err) {
  if (err) {
    console.error('Sync' + err);
  } else {
      console.log('Sync OK');
  }
});

module.exports.sequelize = sequelize
