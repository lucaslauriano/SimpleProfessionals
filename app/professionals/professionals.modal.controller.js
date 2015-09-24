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
        '$log',
        'id'
    ];

    function ProfessionalModalCtrl($injector, $modalInstance, $location, $log, id) {

        var ProfessionalService = $injector.get('app.professionals.ProfessionalService');

        var viewModel = this;

        var PublicProperties = {
            cancel: _cancel,
            closeModal: _closeModal,
            isSalvarDisabled: _isSalvarDisabled,
            salvar: _salvar
        };

        _.extend(viewModel, PublicProperties);

        init();

        function init() {
            ProfessionalService.get(id).then(function(professional) {
                viewModel.professional = professional.data;

            });
        }

        function isInvalid() {
            return viewModel.listDetail.$invalid;
        }

        function goToListarProfessionals() {
            $location.path('/listProfessionals');
        }
        
        function _cancel() {
            $modalInstance.dismiss('cancel');
        }
        
        function _closeModal() {
            $modalInstance.close();
        }

        function _isSalvarDisabled() {
            if (!professional.id) {
                return isInvalid();
            }
            return isClean();
        }

        function _salvar() {
            return ProfessionalService.salvar(viewModel.professional).then(function() {
                $modalInstance.close();
            });
        }
    }
})();
