(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.professionals:ProfessionalsCtrl
     * @description
     * # ProfessionalsCtrl
     * Modal Controller de app.professionals
     */

    angular.module('app.professionals')
        .controller('app.professionals.ProfessionalsCtrl', ProfessionalsCtrl);

    ProfessionalsCtrl.$inject = [
        '$injector',
        '$log',
        '$modal',
    ];

    function ProfessionalsCtrl($injector, $log, $modal) {
        var viewModel = this;
        var ProfessionalService = $injector.get('app.professionals.ProfessionalService');
        var PublicProparties = {
            deletar: _deletar,
            getTotalProfessionals: _getTotalProfessionals,
            openModalEdit: _openModalEdit
        };

        _.extend(viewModel, PublicProparties);

        init();

        function init() {

            ProfessionalService.getList(page(), pageSize()).then(function(professionals) {
                viewModel.professionals = professionals;
                viewModel.professionals.isLast = professionals.isLast;
            });

            ProfessionalService.customGET().then(function(professional) {
                viewModel.professional = _.first(professional.data);
            });
        }

        viewModel.currentPage = page();
        viewModel.maxSize = 5; //Limita o numero da paginação.
        viewModel.total = 647;
        viewModel.numPerPage = pageSize();
        viewModel.filteredTodos = [];

         // viewModel.$watch('currentPage + numPerPage', updateFilteredItems);

        function updateFilteredItems() {

            var begin = ((viewModel.currentPage - 1) * viewModel.numPerPage),
                end = begin + viewModel.numPerPage;

            viewModel.filteredTodos = viewModel.professionals.slice(begin, end);
        }

        $log.log(viewModel.numPerPage,  viewModel.maxSize,  viewModel.total, viewModel.numPerPage, viewModel.filteredTodos );

        function getTotal() {
            return viewModel.total = _.slice(viewModel.professionals);
        }

   

        function page() {
            return 1;
        }

        function pageSize() {
            return 4;
        }

        function _q() {

        }

        function _getTotalProfessionals() {
            return viewModel.professionals && viewModel.professionals.length;
        }


        function _deletar(idProfessional) {
            ProfessionalService.deletar(idProfessional).then(function() {
                removerView(idProfessional);
            });

            function removerView(idProfessional) {
                viewModel.professionals = _.reject(viewModel.professionals, function(professional) {
                    return idProfessional === professional._id;
                });
            }
        }


        function _openModalEdit(idProfessional) {
            $modal.open({
                templateUrl: 'professionals/professionals.modalEdit.html',
                controller: 'app.professionals.ProfessionalModalCtrl',
                controllerAs: 'ProfessionalModalCtrl',
                resolve: {
                    id: function() {
                        return idProfessional;
                    }
                }
            });
        }
    }
})();
