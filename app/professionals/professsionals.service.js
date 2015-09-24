(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.professionals.factory:ProfessionalService
     * @description
     * # ProfessionalService
     * Factory of the app.ProfessionalService
     */

    angular
        .module('app.professionals')
        .factory('app.professionals.ProfessionalService', ProfessionalService);

    ProfessionalService.$inject = ['$injector'];

    function ProfessionalService($injector) {
        var Restangular = $injector.get('Restangular');

        var PublicMethods = {
            customGET: _customGET,
            get: _get,
            customGETLIST: _customGETLIST,
            deletar: _deletar,
            salvar: _salvar
        };

        return PublicMethods;

        function _get(id) {
            return Restangular.one('professionals', id).get();
        }

        function _customGETLIST(_page, _pageSize, _q) {
            return Restangular.all('professionals').customGETLIST("", {page: _page, pageSize: _pageSize, q: _q});
        }

        function _customGET(_q) {
            return Restangular.one('professionals').customGET("", {q: _q});
        }

        function _salvar(professional) {
            return !professional._id?
                Restangular.all('professionals').post(professional) :
                Restangular.one('professionals').customPUT(professional, professional._id);
        }

        function _deletar(idProfessional) {
            return Restangular.one('professionals', idProfessional).remove();
        }
    }
})();

