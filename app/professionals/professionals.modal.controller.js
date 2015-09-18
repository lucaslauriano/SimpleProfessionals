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
        '$rootScope',
        '$location',
        'id'
    ];

    function ProfessionalModalCtrl($injector, $modalInstance, $rootScope, $location, id) {

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
            ProfessionalService.get(id).then(function(professional) {
                viewModel.professional = _.first(professional.data);
            });
        }

        function isInvalid() {
            return viewModel.listDetail.$invalid;
        }

        function _closeModal() {
            $modalInstance.close();
        }

        function _cancel() {
            $modalInstance.dismiss('cancel');
        }

        function watchController(){
            $rootScope.$broadcast('BOOM!', viewModel.professional.email)
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
            return ProfessionalService.salvar(viewModel.professional).then(function() {
                $modalInstance.close();
            }).then(function() {
                watchController();
            });
        }
    }

})();
