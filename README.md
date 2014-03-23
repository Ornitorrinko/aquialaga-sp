# aquialaga-sp
alaga?
============

Projeto Aqui Alaga? => HACKATONA CET SP
++++

## HTTP API 

### informações sobre a previsão do tempo no momento em são paulo
- **`GET`** *{host}/saopedro/previsao* (ex:http://aqui-alaga-sp.ornitorrinko.com/saopedro/previsao)
	
#### retorno
```javascript
	data: {
		code: "11" -- > maior que 11 indica chuva
		date: "22 Mar 2014" --> data da previão
		day: "Sat" --> dia da semana da previsão
		high: "24" -- > maior temperatura
		low: "18" -- > menor temperatura
		text: "Light Rain" --> descritivo da temperatura
	}
```
### reportar pontos de algamentos
- **`POST`** *{host}/ocorrencias* (ex:http://aqui-alaga-sp.herokuapp.com/ocorrencias)
      - **`latitude`**
      - **`longitude`**
      - **`nivel`** -> indicar numa escala de 1 até 3 o nível do alagamento



### Buscar todas ocorrencias em um raio de até 5km da coordenada passada na url
- **`GET`** *{host}/ocorrencias/:lat/:lng* (ex:http://aqui-alaga-sp.herokuapp.com/ocorrencias/-23.5505/-46.6333)

      - **`:lat`** -> valor da latitude
      - **`:lng`** -> valor da longitude

#### retorno
```javascript
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
```
