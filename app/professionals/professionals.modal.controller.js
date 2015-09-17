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
            addItemInLista: _addItemInLista,
            cancel: _cancel,
            closeModal: _closeModal,
            savarItemInLista: _savarItemInLista
        };

        _.extend(viewModel, propriedadesPublicas);

        init();

        function init() {
            ProfessionalService.get(id).then(function(professional) {
                viewModel.professional = professional;
            });

        }

        function getAmount() {
        /*    return viewModel.novoItemListaAmount;*/
        }

        function getNovoItem() {
          

/*            console.log('1: ', viewModel.novoItemLista.selected);
            console.log('1.1: ', viewModel.novoItemLista);
            

            novoItem.amount = angular.copy(getAmount());

            viewModel.novoItemListaAmount = 0;*/
        }

        function _addItemInLista() {
/*            var novoItem = angular.copy(viewModel.novoItemLista);
            console.log('2  : ', novoItem);
            viewModel.lista.itens.push(viewModel.novoItemLista);
            console.log('3  : ', novoItem);*/
        }

        function _closeModal() {
            $modalInstance.close();
        }

        function _cancel() {
            $modalInstance.dismiss('cancel');
        }

        function _savarItemInLista() {
            console.log('savarItemInLista');
            // ListaService.salvar(viewModel.lista);
            // viewModel.lista.put().then(function() {
            //$modalInstance.close();
        }
    }

})();
