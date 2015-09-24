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
        viewModel.q='';

        function init() {
            ProfessionalService.getList(viewModel.currentPage, pageSize(),  viewModel.q).then(function(professionals) {
                viewModel.professionals = professionals;
                viewModel.professionals.isLast = professionals.isLast;
            });
        }

        //## Private ##//
        function totalItens() {
            return viewModel.professionals && viewModel.professionals.length;
        }

        function isInvalid() {
            return viewModel.detail.$invalid;
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
//-------------------------------------------------------------
        function _nextPage() {
            if (viewModel.professionals.isLast != true) {
               viewModel.currentPage++;
            }else {
               return isInvalid();
            }
            $log.log(viewModel.currentPage);
            return init();
        }

        function _prevPage() {
            if (viewModel.currentPage > 0) {
               viewModel.currentPage--;
            } else {
               return  viewModel.currentPage+1;
            }
            $log.log(viewModel.currentPage);
            return init();
        }
//--------------------------------------------------------------

        function _getSearch(search) {
             viewModel.q=search;
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
           return init();
        }

    }
})();
