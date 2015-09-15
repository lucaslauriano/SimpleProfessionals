(function() {
    'use strict';

    angular.module('app.professionals')
        .controller('app.professionals.ProfessionalsCtrl', ProfessionalsCtrl);

    ProfessionalsCtrl.$inject = [
        '$injector'
    ];

    function ProfessionalsCtrl($injector, $modal) {
        var viewModel = this;
        var ProfessionalService = $injector.get('app.professionals.ProfessionalService');

        var PublicProparties = {
            getTotalProfessionals: _getTotalProfessionals,
            deletar: _deletar
        };

        _.extend(viewModel, PublicProparties);

        init();

        function init() {
            ProfessionalService.getList().then(function(professionals) {
                viewModel.professionals = professionals;
            });
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
