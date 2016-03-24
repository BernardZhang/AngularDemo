define(['app', 'BaseModel'], function (app, BaseModel) {
	app.controller('PlanController', [
        '$scope',
        '$routeParams',
        'BaseModel',
        'SERVICESCONFIG',

        function ($scope, $routeParams, BaseModel, SERVICESCONFIG) {
            var planModel = new BaseModel(SERVICESCONFIG.PLAN);

            angular.extend($scope, $routeParams);

            // event handlers
            angular.extend($scope, {
                onSearch: function () {

                },
                onReset: function () {

                },
                onEdit: function () {

                },
                onDelete: function () {

                },
                onExcute: function () {

                }
            });

            planModel.getList(null, function (data) {
                angular.extend($scope, {
                    plans: data || []
                });
            });
        }
    ]);
});