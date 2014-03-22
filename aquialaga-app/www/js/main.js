var app = app ? app : {};

app.main = {
	host: 'http://localhost:3001/',
	getOcorrencias: function(){
		var urlGetOcorrencias = app.main.host+'ocorrencias/'+app.position.coords.latitude+'/'+app.position.coords.longitude;
		
		var getOcorrecias = $.get(urlGetOcorrencias);

		getOcorrecias.done(function(data){
			var a = data;
		});

		getOcorrecias.fail(function(err){
			var a = err;
		});
	},
	postOcorrencia: function(){
		
		var url	= '/ocorrencias/'+app.position.coords.latitude+'/'+app.position.coords.longitude;

		var postOcorrencia = $.post(url);
		
		sendButton.button('loading');

		postOcorrencia.done(function(data){

		});
		postOcorrencia.fail(function(data){

		});
		postOcorrencia.always(function(){
			sendButton.button('reset');
		});
	},
	bindEvents: function(){
		app.main.getOcorrencias();
		
		var sendButton = $('#btn-send');
		sendButton.unbind('click');

		sendButton.click(function(){
			sendButton.removeAttr('disabled');
			app.main.postOcorrencia();
		});
	}
}
