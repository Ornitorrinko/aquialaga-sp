function errorManager() {
	return {
		errorDb: function ( msg ) {
			console.trace('*************************', 'error message => ' , msg)
		},
		
		exceptionHandler : function ( ex ) {
			console.trace('*************************', 'exception => ' , ex)
		},
		secureCall : function ( owner, params , func ) {
			try {
				func.call( owner, params )
			} catch ( ex ) {
				this.exceptionHandler ( ex )
			}
		}
		
	}
}


module.exports = errorManager()