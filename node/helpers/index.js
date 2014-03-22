require('./customPrototypes')
exports.requestUrlReturnAsJSON = require('./web')['requestUrlReturnAsJSON']
exports.requestUrlPostReturn = require('./web')['requestUrlPostReturn']
exports.requestUrlReturn = require('./web')['requestUrlReturn']
exports.guid = require('node-uuid').v1
exports.errorManager = require('./error')
exports.xml = require('./xml')
<<<<<<< HEAD
exports.config =  require('../config')
=======
exports.config =  config = require('../config')
exports.maps = require('./mapsUtils');
>>>>>>> FETCH_HEAD
