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
            nextDesabled: _nextDesabled,
            openModalEdit: _openModalEdit,
            prevDesabled: _prevDesabled,
            prevPage: _prevPage,
            refresh: _refresh

        };

        _.extend(viewModel, PublicProperties);

        init();

        viewModel.currentPage = 1;
        viewModel.q = '';

        function init() {
            ProfessionalService.customGETLIST(viewModel.currentPage, pageSize(), viewModel.q).then(function(professionals) {
                viewModel.professionals = professionals;
                viewModel.professionals.isLast = professionals.isLast;
            });
        }

        function totalItens() {
            return viewModel.professionals && viewModel.professionals.length;
        }

        function pageSize() {
            return 4;
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

        function _prevDesabled() {
            if (viewModel.currentPage === 1 ) {
                return true;
            }
        }

        function _nextDesabled() {
            if (viewModel.professionals.isLast) {
                return true;
            }
        }

        function _nextPage() {
            if (viewModel.professionals.isLast !== true) {
                viewModel.currentPage++;
            } 
            $log.log(viewModel.currentPage);
            return init();
        }

        function _prevPage() {
            if (viewModel.currentPage > 0) {
                viewModel.currentPage--; 
            }
            if (viewModel.currentPage === 0) {
                viewModel.currentPage++;
                return init();
            }


            $log.log(viewModel.currentPage);
            return init();
        }

        function _getSearch(search) {
            viewModel.q = search;
            return init();
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
            viewModel.currentPage = 1;
             viewModel.q=''
             return init();
        }
    }
})();
