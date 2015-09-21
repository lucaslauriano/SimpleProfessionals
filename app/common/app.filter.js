(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.professionals
	 * @description
	 * # NameConfiguration
	 * Configuration of the app.professionals
	 */
	angular
	  .module('app.professionals')
	  .filter(filter);

	NameConfiguration.$inject = ['dependencies'];

	function NameConfiguration(dependencies) {
		//content
	}
})();

.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});