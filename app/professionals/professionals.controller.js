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
        var PublicProperties = {
            deletar: _deletar,
            getSearch: _getSearch,
            getTotalProfessionals: _getTotalProfessionals,
            numPages: _numPages,
            openModalEdit: _openModalEdit,
            refresh: _refresh

        };

        _.extend(viewModel, PublicProperties);

        init();

        function init() {
            ProfessionalService.getList(page(), pageSize()).then(function(professionals) {
                viewModel.professionals = professionals;
                viewModel.professionals.isLast = professionals.isLast;
            });
        }


        viewModel.currentPage = page(); // Pagina Atual.
        viewModel.maxSize = 3; // Limita o numero da paginação.
        viewModel.totalItems = getTotal(); // total-items.
        viewModel.numPerPage = pageSize(); // Total de profissionais por páginas.
        viewModel.filteredTodos = [];


        function _numPages() {
            return Math.ceil(viewModel.professionals.length / viewModel.numPerPage);
        }

        function page() {
            return 1;
        }

        function pageSize() {
            return 20;
        }

        function getTotal() {
            return;
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

        function _getSearch(search) {
            ProfessionalService.getList(page(), pageSize(), search).then(function(professionals) {
                viewModel.professionals = professionals;
            });

            return viewModel.professionals;
        }

        function _getTotalProfessionals() {
            return viewModel.professionals && viewModel.professionals.length;
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

        function _refresh() {
            return init();
        }

    }
})();
