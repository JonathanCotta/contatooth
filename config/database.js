var mongoose = require('mongoose');

var uri = 'mongodb://localhost:27017/contatooth';

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('connected', function() {
	console.log('Mongoose! Conectado em ' + uri);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose! Desconectado de ' + uri);
});

mongoose.connection.on('error', function(erro) {
	console.log('Mongoose! Erro na conexão: ' + erro);
});

module.exports = mongoose;
