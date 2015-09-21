(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name todoListAppApp
     * @description
     * # todoListAppApp
     *
     * Main module of the application.
     */
    angular
        .module('app', [
            'app.core',
            'app.route',
            'app.filter',
            'app.professionals'
        ]);

    angular.module('app.professionals', []);
})();
