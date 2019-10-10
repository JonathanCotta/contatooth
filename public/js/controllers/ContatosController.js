angular.module('contatooth').controller('ContatosController', function($scope, Contato) {
	$scope.contatos = [];

	$scope.filtro = '';

	// $http
	// 	.get('/contatos')
	// 	.success(function(data) {
	// 		$scope.contatos = data;
	// 	})
	// 	.error(function(statusText) {
	// 		console.log('Não foi possível obter a lista de contatos');
	// 		console.log(statusText);
	// 	});

	function buscaContatos() {
		Contato.query(
			function(contatos) {
				$scope.contatos = contatos;
				$scope.mensagem = {};
			},
			function(erro) {
				console.log(erro);
				$scope.mensagem = {
					texto: 'Não foi possível obter a lista de contatos'
				};
			}
		);
	}

	buscaContatos();

	$scope.remove = function(contato) {
		Contato.delete({ id: contato._id }, buscaContatos, function(erro) {
			console.log(erro);
			$scope.mensagem = {
				texto: 'Não foi possível remover o contato'
			};
		});
	};
});
