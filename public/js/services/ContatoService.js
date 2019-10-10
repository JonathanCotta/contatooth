angular.module('contatooth').factory('Contato', function($resource) {
	return $resource('/contatos/:id');
});
