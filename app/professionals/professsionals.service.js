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
            customGet: _customGet,
            get: _get,
            getList: _getList,
            deletar: _deletar,
            salvar: _salvar
        };

        return PublicMethods;

        init();

        function init() {
        }

        function _customGet(id, _q) {
            return Restangular.one('professionals', id).customGET("professional", {q: _q});
        }

        function _get(id) {
            return Restangular.one('professionals').get();
        }


        function _getList(_page, _pageSize) {
            return Restangular.all('professionals').customGETLIST("", {page: _page, pageSize: _pageSize});
        }

        function _salvar(professional) {
            return !professional.id ?
                Restangular.all('professionals').post(professional) :
                Restangular.one('professionals').customPUT("professional", professional.id);
        }

        function _deletar(idProfessional) {
            return Restangular.one('professionals', idProfessional).remove();
        }
    }
})();

