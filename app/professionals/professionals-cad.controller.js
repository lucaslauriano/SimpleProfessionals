(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.professional.controller:ProfessionalCadCtrl
     * @description
     * # ProfessionalCadCtrl
     * Controller of the app.professional
     */
    angular
        .module('app.professionals')
        .controller('app.professionals.ProfessionalCadCtrl', ProfessionalCadCtrl);

    ProfessionalCadCtrl.$inject = [
        '$injector',
        '$location',
        'professional'
    ];

    function ProfessionalCadCtrl($injector, $location, professional) {

        var ProfessionalService = $injector.get('app.professionals.ProfessionalService');
        var viewModel = this;
       
        var PublicProperties = {
            cancelar: _cancelar,
            deletar: _deletar,
            isSalvarDisabled: _isSalvarDisabled,
            salvar: _salvar
        };

        _.extend(viewModel, PublicProperties);

        init();

        function init() {
             viewModel.professional = angular.copy(professional);
        }

        function isClean() {
            return angular.equals(professional, viewModel.professional);
        }

        function isInvalid() {
            return viewModel.listDetail.$invalid;
        }

        function goToListarProfessionals() {
            $location.path('/listProfessionals');
        }

        function _cancelar() {
            goToListarProfessionals();
        }

        function _deletar() {
            return ProfessionalService.deletar(viewModel.professional.id).then(function() {
                goToListarProfessionals();
            });
        }

        function _isSalvarDisabled() {
            if (!professional.id) {
                return isInvalid();
            }
            return isClean();
        }

        function _salvar() {
            return ProfessionalService.salvar(viewModel.professional).then(function() {
                goToListarProfessionals();
            });
        }
    }
})();
