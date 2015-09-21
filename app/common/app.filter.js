(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.professionals
     * @description
     * # NameConfiguration
     * Configuration of the app.professionals
     */
    angular
        .module('app.filter', [])
        .filter(filter);

    filter.$inject = [];

    function filter() {

        init();

        function init(input, start) {
            start = parseInt(start, 10);

            return input.slice(start);
        }

    }
})();
