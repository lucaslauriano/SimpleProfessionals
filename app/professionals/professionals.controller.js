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
            nextPage: _nextPage,
            openModalEdit: _openModalEdit,
            prevPage: _prevPage,
            refresh: _refresh

        };

        _.extend(viewModel, PublicProperties);

        init();

        viewModel.currentPage = 1;

        function init() {
            ProfessionalService.getList(page(), pageSize()).then(function(professionals) {
                viewModel.professionals = professionals;
                viewModel.professionals.isLast = professionals.isLast;
            });
        }

        //## Private ##//
        function totalItens() {
            return viewModel.professionals && viewModel.professionals.length;
        }

        function page() {
            return viewModel.currentPage;
        }

        function pageSize() {
            return 1;
        }

        //## Public ##//
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



        function _nextPage() {
            if (viewModel.professionals.isLast !== true) {
                viewModel.currentPage++;
            }
            $log.log(viewModel.currentPage);

            return ProfessionalService.getList(viewModel.currentPage, pageSize()).then(function(professionals) {
                viewModel.professionals = professionals;
            });
        }

        $log.log('VM', viewModel.currentPage);

        function _prevPage() {
            if (viewModel.currentPage > 0) {
                viewModel.currentPage--;
            }
            return ProfessionalService.getList(viewModel.currentPage, pageSize()).then(function(professionals) {
                viewModel.professionals = professionals;
            });
        }



        function _getSearch(search) {
            ProfessionalService.getList(page(), pageSize(), search).then(function(professionals) {
                viewModel.professionals = professionals;
            });

            return viewModel.professionals;
        }

        function _getTotalProfessionals() {
            return totalItens();
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
