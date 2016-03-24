define(['app', 'BaseModel'], function (app, BaseModel){
    app.controller('DataController', [
        '$scope',
        '$routeParams',
        'BaseModel',
        'SERVICESCONFIG',

        function ($scope, $routeParams, BaseModel, SERVICESCONFIG) {
            var dataModel = new BaseModel(SERVICESCONFIG.DATA);

            angular.extend($scope, $routeParams);

            dataModel.getList(null, function (data) {
                $scope.data = data || [];
            });
        }
    ]);
});