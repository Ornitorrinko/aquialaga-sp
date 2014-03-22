var app = app ? app : {};

app.main = {
	url: app.host+'ocorrencias/',
	ocorrencias: {},
	getOcorrencias: function(position){
		var urlGetOcorrencias = app.main.url+position.coords.latitude+'/'+position.coords.longitude;
		
		var getOcorrecias = $.get(urlGetOcorrencias);

		getOcorrecias.done(function(data){
			app.main.ocorrencias = data.data || {};
			if(!app.map.scriptLoaded)
				app.map.loadScript();
			else
				app.map.plotMarkers();
		});

		getOcorrecias.fail(function(err){
			var a = err;
		});
	},
	postOcorrencia: function(button){
		button.button('loading');

		var level = button.data('level');
		var obj = {
				latitude: app.myPosition.coords.latitude
			,	longitude: 	app.myPosition.coords.longitude
			,	nivel: level
		}

		var postOcorrencia = $.post(app.main.url, obj);
		
		postOcorrencia.done(function(data){
			alertify('Obrigado!', 'Ocorrencia efetuada com sucesso', 'bottom');
			app.map.plotMarker(obj.latitude, obj.longitude);
		});
		postOcorrencia.fail(function(data){
			alertify('Oops!', 'Ocorreu um erro', 'bottom');
		});
		postOcorrencia.always(function(){
			button.button('reset');
		});
	},
	bindEvents: function(){
		app.main.getOcorrencias(app.myPosition);
		
		var sendButton = $('.btn-send');
		sendButton.removeAttr('disabled');
		
		sendButton.unbind('click');

		sendButton.click(function(){
			var popup = $("#popupReport");
			popup.popup('close');
			app.main.postOcorrencia($(this));
		});
	}
}
