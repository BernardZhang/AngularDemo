define(['app', 'BaseModel'], function(app, BaseModel) {
	app.controller('ApiController', [
        '$scope',
        'BaseModel',
        'SERVICESCONFIG',
        function($scope, BaseModel, SERVICESCONFIG) {
            var apiModel = new BaseModel(SERVICESCONFIG.API),
                getList = function (param) {
                    apiModel.getList(param, function (data) {
                        angular.extend($scope, data);
                    });
                };

            angular.extend($scope, {
                searchInfo: {
                    apiId: '',
                    path: '',
                    method: '',
                    module: '',
                    author: '',
                    pageNum: 1,
                    pageSize: 1
                },
                apis: [],
                pageInfo: {
                    total: 10,
                    pageCount: 10,
                    currentPage: 1
                }
            });

            // events handle
            angular.extend($scope, {
                searchHandle: function (e) {
                    getList(angular.copy($scope.searchInfo));
                },
                resetSearchInfo: function (e) {
                    $scope.searchInfo = { selMethod: '', module: ''};
                },
                changePage: function (page) {
                    $scope.searchInfo.pageNum = page;
                    getList(angular.copy($scope.searchInfo));
                },
                deleteHandle: function (e) {
                    
                }
            });

            // load data
            getList(angular.copy($scope.searchInfo));
        }
    ]);

});