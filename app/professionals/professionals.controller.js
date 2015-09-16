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
            getTotalProfessionals: _getTotalProfessionals,
            deletar: _deletar
        };

        _.extend(viewModel, PublicProparties);

        init();

        function init() {
            ProfessionalService.getList(page(), pageSize()).then(function(professionals) {
                viewModel.professionals = professionals;
            });

            console.log(viewModel.length);

            viewModel.maxSize = 4;
            viewModel.pageSize = pageSize();
            viewModel.currentPage = page();
            // viewModel.total = getTotalProfissional();

        }

        function page() {
            return 2;
        }

        function pageSize() {
            return 8;
        }

        function _getTotalProfessionals() {
            return viewModel.professionals && viewModel.professionals.length;
        }
        // viewModel.filteredTodos = [];

        // viewModel.$watch('currentPage + numPerPage', function() {
        //     var begin = ((viewModel.page() - 1) * viewModel.pageSize()),
        //         end = begin + viewModel.pageSize();

        //    viewModel.filteredTodos = viewModel.professionals.slice(begin, end);
        // });



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

        // console.log(getTotalProfessionals());
    }
})();
