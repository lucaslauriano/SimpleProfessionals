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
        'id'
    ];

    function ProfessionalModalCtrl($injector, $modalInstance, id) {

        var ProfessionalService = $injector.get('app.professionals.ProfessionalService');

        var viewModel = this;
        viewModel.novoItemLista = {};

        var propriedadesPublicas = {
            cancel: _cancel,
            closeModal: _closeModal,
            salvar: _salvar
        };

        _.extend(viewModel, propriedadesPublicas);

        init();

        function init() {
            ProfessionalService.customGet(id).then(function(professional) {
                viewModel.professional = professional;
            });

        }

        function _closeModal() {
            $modalInstance.close();
        }

        function _cancel() {
            $modalInstance.dismiss('cancel');
        }
        function _salvar() {
            console.log('salvar');
            return ProfessionalService.salvar(viewModel.professional).then(function() {
                goToListarProfessionals();
            });
        }
    }

})();
