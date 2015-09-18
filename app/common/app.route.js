(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.route
     * @description
     * # config

     * Configuration of the app.route
     */

    angular
        .module('app.route', [])
        .config(config);

    config.$inject = ['$urlRouterProvider', '$stateProvider', 'RestangularProvider'];

    function config($urlRouterProvider, $stateProvider, RestangularProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '../main/main.html'
            })
            .state('listProfessionals', {
                url: '/listProfessionals',
                templateUrl: '../professionals/professionals.list.html',
                controller: 'app.professionals.ProfessionalsCtrl',
                controllerAs: 'ProfessionalsCtrl'
            })
/*            .state('editProfessional', {
                url: '/editProfessional/:idProfessional',
                templateUrl: '../professionals/professionals.cad.html',
                controller: 'app.professionals.ProfessionalCadCtrl',
                controllerAs: 'ProfessionalCadCtrl',
                resolve: {
                    professional: function(Restangular, $stateParams) {
                        return Restangular.one('professionals', $stateParams.idProfessional).get();
                    }
                }
            })*/
            .state('newProfessional', {
                url: '/newProfessional',
                templateUrl: '../professionals/professionals.cad.html',
                controller: 'app.professionals.ProfessionalCadCtrl',
                controllerAs: 'ProfessionalCadCtrl',
                resolve: {
                    professional: function($q) {
                        return $q(function(resolve) {
                            resolve({});
                        });
                    }
                }
            });

        RestangularProvider.setBaseUrl('http://api.achronic.com');

        RestangularProvider.addResponseInterceptor(function(professionals, operation, what, url, response, deferred) {

            var extractedData;

            if (operation === "getList") {
                extractedData = professionals.data;
                extractedData.isLast = professionals.isLast;

            } else {
                extractedData = professionals;
            }
            return extractedData;
        });
    }
    
})();
