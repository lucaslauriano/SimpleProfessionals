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
        '$modal'
    ];

    function ProfessionalsCtrl($injector, $modal) {
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
        }

        viewModel.maxSize = 4;
        viewModel.pageSize = pageSize();
        viewModel.currentPage = page();


        function page() {
            return 1;
        }

        function pageSize() {
            return 8;
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
