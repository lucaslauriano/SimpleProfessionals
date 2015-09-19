(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name app.core
     * @description
     * # todoApp.core
     
     * Modulo que carrega  as dependências.
     */
    angular
        .module('app.core', [
            'ui.router',
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'restangular',
            'ui.bootstrap',
            'ngMask'
        ]);
})();
