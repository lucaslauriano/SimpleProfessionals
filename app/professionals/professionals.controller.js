(function() {
    'use strict';

    angular.module('app.professionals')
        .controller('app.professionals.ProfessionalsCtrl', ProfessionalsCtrl);

    ProfessionalsCtrl.$inject = [
        '$injector'
    ];

    function ProfessionalsCtrl($injector) {
        var viewModel = this;
        var ProfessionalService = $injector.get('app.professionals.ProfessionalService');

        var PublicProparties = {
            deletar: _deletar,
            getTotalProfessionals: _getTotalProfessionals
        };

        _.extend(viewModel, PublicProparties);

        init();

        function init() {
            ProfessionalService.getList(page(), pageSize()).then(function(professionals) {
                viewModel.professionals = professionals;
                viewModel.professionals.isLast = professionals.isLast;
            });

         

        }




        // viewModel.professionals = angular.copy(professionals);
        // viewModel.professionals.isLast = angular.copy(professionals.isLast);

        // console.log("VIEW MODEL: " + viewModel.professionals);
        // console.log("VIEW MODEL is Last: " + viewModel.professionals.isLast);

        // if (viewModel.professionals.isLast === true) {
        //     console.log("TRUL PORRA");
        // }

        // viewModel.professionals = angular.copy(viewModel.professionals);

        // console.log("viewmodel: - " + viewModel);
        // console.log("viewmodel.Professional: - " + viewModel.professionals);
        // viewModel.professionals.maxSize = 4;
        // viewModel.professionals.pageSize = pageSize();
        // viewModel.professionals.currentPage = page();
        // viewModel.total = getTotalProfissional();


        // console.log("pageSize " + viewModel.professionals.pageSize);
        // console.log("maxSize " +  viewModel.professionals.maxSize);
        // console.log("currentPage " + viewModel.professionals.currentPage);
        // console.log("isLast " + viewModel.isLast);

        // viewModel.filteredTodos = [];

        // viewModel.$watch('currentPage + numPerPage', function() {
        //     var begin = ((viewModel.page() - 1) * viewModel.pageSize()),
        //         end = begin + viewModel.pageSize();

        //    viewModel.filteredTodos = viewModel.professionals.slice(begin, end);
        // });

        function page() {
            return 1;
        }

        function pageSize() {
            return 8;
        }

        function _getTotalProfessionals() {
            return viewModel.professionals && viewModel.professionals.length;
        }

        console.log(_getTotalProfessionals());

        function _deletar(idProfessional) {
            ProfessionalService.deletar(idProfessional).then(function() {
                removerView(idProfessional);
            });

            function removerView(idProfessional) {
                viewModel.professionals = _.reject(viewModel.professionals, function(professional) {
                    return idProfessional === professional.id;
                });
            }
        }

        // function _openModal(idProfessional) {
        //     $modal.open({
        //         templateUrl: 'professionals/professionals.modal.html',
        //         controller: 'app.professionals.ProfessionalsModalCtrl',
        //         controllerAs: 'ProfessionalsModalCtrl',
        //         resolve: {
        //             id: function() {
        //                 return idProfessional;
        //             }
        //         }
        //     });
        // }

    }
})();
