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
        }

        viewModel.maxSize = 3;

        // viewModel.filteredTodos = [];

        // viewModel.$watch('currentPage + numPerPage', function() {
        //     var begin = ((viewModel.page() - 1) * viewModel.pageSize()),
        //         end = begin + viewModel.pageSize();

        //    viewModel.filteredTodos = viewModel.professionals.slice(begin, end);
        // });

        function _currentPage() {
            var curPage = page();
            return curPage;
        }

        function _maxSize() {
            var pgSize = pageSize();
            return pgSize;
        }


        function page() {
            return 1;
        }

        function pageSize() {
            return 6;
        }

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

        function _getTotalProfessionals() {
            return viewModel.professionals && viewModel.professionals.length;
        }
    }
})();
