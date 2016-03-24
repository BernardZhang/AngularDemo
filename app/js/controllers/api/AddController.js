/**
 * Api add controller
 * create by zhangyou04 02/23
 */
define(['app', 'BaseModel'], function(app, BaseModel) {
	app.controller('ApiAddController', [
        '$scope',
        '$routeParams',
        'BaseModel',
        'SERVICESCONFIG',
        function($scope, $routeParams, BaseModel, SERVICESCONFIG) {
            var apiModel = new BaseModel(SERVICESCONFIG.API),
                moduleModel = new BaseModel(SERVICESCONFIG.MODULE),
                getModules = function (param) {
                    moduleModel.getList(param, function (data) {
                        angular.extend($scope, {
                            modules: data
                        });
                    });
                };

            angular.extend($scope, {
                modules: []
            });

            console.log($routeParams);
            // events handle
            angular.extend($scope, {
                
            });

            // load data
            getModules();

            if ($routeParams.id) {
                apiModel.getDetail($routeParams, function (data) {
                    angular.extend($scope, {
                        api: data
                    });
                });
            }
        }
    ]);
});