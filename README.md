aquialaga-sp
alaga?
============

Projeto Aqui Alaga? => HACKATONA CET SP
++++

API

- {host}/saopedro/previsao (ex:http://aqui-alaga-sp.ornitorrinko.com/saopedro/previsao)
	informações sobre a previsão do tempo no momento em são paulo
	* retorno
	data: {
		code: "11" -- > maior que 11 indica chuva
		date: "22 Mar 2014" --> data da previão
		day: "Sat" --> dia da semana da previsão
		high: "24" -- > maior temperatura
		low: "18" -- > menor temperatura
		text: "Light Rain" --> descritivo da temperatura
	}


- {host}/ocorrencias/:lat/:lng (ex:http://aqui-alaga-sp.herokuapp.com/ocorrencias/-23.5505/-46.6333)
	Buscar todas ocorrencias em um raio de até 5km da coordenada passada na url
	:lat -> valor da latitude	
	:lng -> valor da longitude

	"data": [
    {
      "qtdCET": 1, --> Quantidade de informação de alagamento fornecida pela CET
      "qtdUsuario": 0, --> Quantidade de informação de alagamento reporta pelos usuários da APP
      "latitude": -23.6395, --> latitude do local que reportado
      "longitude": -46.6134 --> longitude do local que reportado
    },
    {
      "qtdCET": 5,
      "qtdUsuario": 0,
      "latitude": -23.6388,
      "longitude": -46.6058
    }]