var app = app ? app : {};

app.main = {
	urlOcorrencias: app.host+'ocorrencias/',
	ocorrencias: {},
	ocorrenciasInMyPosition: {},
	ocorrenciaPrecisionKm: 0.1,
	getOcorrencias: function(position){
		var ocorrenciasPrecisionDg = this.ocorrenciaPrecisionKm/111;
		var urlGetOcorrencias = app.main.urlOcorrencias+position.coords.latitude+'/'+position.coords.longitude;
		
		var getOcorrecias = $.get(urlGetOcorrencias);

		getOcorrecias.done(function(data){
			app.main.ocorrencias = data.data || {};

			app.main.ocorrenciasInMyPosition = _.filter(app.main.ocorrencias, function(ocorrencia){ 
				return (ocorrencia.latitude > app.myPosition.coords.latitude - ocorrenciasPrecisionDg && 
				ocorrencia.latitude < app.myPosition.coords.latitude + ocorrenciasPrecisionDg &&
				ocorrencia.longitude > app.myPosition.coords.longitude - ocorrenciasPrecisionDg && 
				ocorrencia.longitude < app.myPosition.coords.longitude + ocorrenciasPrecisionDg);
			});

			app.main.setOcorrenciasText();

			if(!app.map.scriptLoaded)
				app.map.loadScript('app.map.initialize');
			/*else
				app.map.plotMarkers();*/
		});

		getOcorrecias.fail(function(err){
			console.log('getOcorrencias =>', err);
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
				if(previsao && previsao.data && app.rain.contains(parseInt(previsao.data.code)))
					app.isGoingToRain = 'SIM'
				else
					app.isGoingToRain = 'NÃO'

				app.main.setPrevisaoDoTempoText();
			}).fail(function(err){
				console.log('getPrevisaoDoTempo =>',err);
			});
	},
	setEnderecoText: function(){
		var endereco = $('#endereco');
		endereco.text(app.myAddress.replace(' - São Paulo, Brazil', ''));
	},
	setOcorrenciasText: function(){
		var numOcorrenciasCET = $('#num-ocorrencias-cet'),
			numOcorrenciasUsers = $('#num-ocorrencias-user'),
			countCET = 0,
			countUser = 0;

		_.each(app.main.ocorrenciasInMyPosition, function(ocorrencia){
			countCET += ocorrencia.qtdCET;
			countUser += ocorrencia.qtdUsuario;
		});

		numOcorrenciasCET.text(countCET);
		numOcorrenciasCET.text(countUser);
	},
	setPrevisaoDoTempoText: function(){
		var previsaoTempo = $('#previsao-tempo');
		previsaoTempo.text(app.isGoingToRain);
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
