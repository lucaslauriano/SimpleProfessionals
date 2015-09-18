(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.professionals:ProfessionalModalCtrl
     * @description
     * # ProfessionalModalCtrl
     * Modal Controller de app.professionals
     */

    angular
        .module('app.professionals')
        .controller('app.professionals.ProfessionalModalCtrl', ProfessionalModalCtrl);

    ProfessionalModalCtrl.$inject = [
        '$injector',
        '$modalInstance',
        '$location',
        'id'
    ];

    function ProfessionalModalCtrl($injector, $modalInstance, $location, id) {

        var ProfessionalService = $injector.get('app.professionals.ProfessionalService');

        var viewModel = this;

        var publicProparties = {
            cancel: _cancel,
            closeModal: _closeModal,
            isSalvarDisabled: _isSalvarDisabled,
            salvar: _salvar
        };

        _.extend(viewModel, publicProparties);

        init();

        function init() {
            ProfessionalService.customGet(id).then(function(professional) {
                viewModel.professional = professional;

                console.log(viewModel.professional);
            });
            
             console.log(viewModel.professional)



        }

         console.log(viewModel.professional)

        // function getEmail(){
        //     return  viewModel.professional.email = angular.copy(professional.email);

        //     console.log(viewModel.professional.email);
        // }

        // function isClean() {
        //     return angular.equals(professional.email, viewModel.professional.email);
        // }

        function isInvalid() {
            return viewModel.listDetail.$invalid;
        }

        function _closeModal() {
            $modalInstance.close();
        }

        function _cancel() {
            $modalInstance.dismiss('cancel');
        }

        function _isSalvarDisabled() {
            if (!professional.id) {
                return isInvalid();
            }
            return isClean();
        }

        function goToListarProfessionals() {
            $location.path('/listProfessionals');
        }

        function _salvar() {
            console.log('salvar');
            return ProfessionalService.salvar(viewModel.professional).then(function() {
                goToListarProfessionals();
            });
        }
    }

})();
