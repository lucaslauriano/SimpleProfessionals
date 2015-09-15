(function(){
	'use strict';

	angular.module('app')
		.directive('dashboard', function(){
			return {
				restrict: 'E',
				templateUrl: 'main/dashboard.html'
			};
		});
})();