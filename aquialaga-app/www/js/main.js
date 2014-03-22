var app = app ? app : {};

app.main = {
	bindEvents: function(){
		var sendButton = $('#btn-send'),
			url	= '/ocorrencias/'+app.position.coords.latitude+'/'+app.position.coords.longitude;
		

		sendButton.removeAttr('disabled');
		
		sendButton.click(function(){
			var get = $.get(url);
			
			sendButton.button('loading');

			get.done(function(data){

			});
			get.fail(function(data){

			});
			get.always(function(){
				sendButton.button('reset');
			});
		});
	}
}
