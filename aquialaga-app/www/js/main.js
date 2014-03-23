var app = app ? app : {};

app.main = {
	urlOcorrencias: app.host+'ocorrencias/',
	ocorrencias: {},
	ocorrenciaPrecisionKm: 0.1,
	getOcorrencias: function(position){
		var ocorrenciasPrecisionDg = this.ocorrenciaPrecisionKm/111;
		var urlGetOcorrencias = app.main.urlOcorrencias+position.coords.latitude+'/'+position.coords.longitude;
		
		var getOcorrecias = $.get(urlGetOcorrencias);

		getOcorrecias.done(function(data){
			app.main.ocorrencias = data.data || {};

			var ocorrenciasInMyPosition = _.filter(app.main.ocorrencias, function(ocorrencia){ 
				return (ocorrencia.latitude > app.myPosition.coords.latitude - ocorrenciasPrecisionDg && 
				ocorrencia.latitude < app.myPosition.coords.latitude + ocorrenciasPrecisionDg &&
				ocorrencia.longitude > app.myPosition.coords.longitude - ocorrenciasPrecisionDg && 
				ocorrencia.longitude < app.myPosition.coords.longitude + ocorrenciasPrecisionDg);
			});

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

		var postOcorrencia = $.post(app.main.urlOcorrencias, obj);
		
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
	getPrevisaoDoTempo: function(){
		$.ajax(app.host + 'saopedro/previsao')
			.done(function(previsao){
				if(previsao && app.rain.contains(parseInt(previsao.data.code)))
					app.isGoingToRain = 'Sim'
				else
					app.isGoingToRain = 'Não'
			}).fail(function(err){
				console.log('getPrevisaoDoTempo =>',err);
			});
	},
	bindEvents: function(){
		app.main.getOcorrencias(app.myPosition);

		app.main.getPrevisaoDoTempo();
		
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
