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
            get: _get,
            getList: _getList,
            deletar: _deletar,
            salvar: _salvar
        };

        return PublicMethods;

        init();

        function init() {
        }

        function _get(id, _q) {
            return Restangular.one('professionals', id).customGET("professionals", {q: _q});
        }

        function _getList(_page, _pageSize) {
            return Restangular.all('professionals').customGETLIST("", {page: _page, pageSize: _pageSize});
        }

        function _salvar(professional) {
            return !professional.id ?
                Restangular.all('professionals').post(professional) :
                Restangular.one('professionals').customPUT(professional, professional.id);
        }

        function _deletar(idProfessional) {
            return Restangular.one('professionals', idProfessional).remove();
        }
    }
})();

