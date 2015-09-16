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
            })
            .state('editProfessional', {
                url: '/editProfessional/:idprofessional',
                templateUrl: '../professionals/professionals.cad.html',
                controller: 'app.professionals.ProfessionalCadCtrl',
                controllerAs: 'ProfessionalCadCtrl',
                resolve: {
                    professional: function(Restangular, $stateParams) {
                        return Restangular.one('professionals', $stateParams.idprofessional).get();
                    }
                }
            });

        RestangularProvider.setBaseUrl('http://api.achronic.com');
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
        RestangularProvider.addResponseInterceptor(function(professionals, operation, what, url, response, deferred) {
            var extractedData;


            if (operation === "getList") {
                extractedData = professionals.data;

            } else {
                extractedData = professionals;

            }
            return extractedData;
        });
    }
})();
