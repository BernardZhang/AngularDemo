define(['app', 'BaseModel'], function(app, BaseModel) {
	app.controller('IndexController', [ 
        '$scope', 
        'BaseModel',
        'SERVICESCONFIG',
        function($scope, BaseModel, SERVICESCONFIG) {
            var model = new BaseModel(SERVICESCONFIG.INDEX);

            model.getList(null, function (data, status, headers, config) {
                $scope.items = data.items || [];
            });
        }
    ]);
});