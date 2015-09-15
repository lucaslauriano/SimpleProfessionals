(function() {
    'use strict';

    angular.module('app')
        .directive('navBar', function() {
            return {
                restrict: 'E',
                templateUrl: 'main/nav-bar.html'
            };
        });
})();
