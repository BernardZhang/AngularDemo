/**
 * Api list controller
 * create by zhangyou04 02/23
 */
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
                },
                getSelectedApis = function () {
                    return ($scope.apis || []).filter(function (api) {
                        return api.selected === true;
                    });
                },
                checkSelectedApi = function (apis, count) {
                    if (apis.length !== count) {
                        app.showPopup(apis.length === 0 ? '请选择要操作的记录' : '一次只能操作' + count + '条记录');
                        // alert(apis.length === 0 ? '请选择要操作的记录' : '一次只能操作' + count + '条记录');
                        return false;
                    }

                    return true;
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
                onEdit: function () {
                    var selApis = getSelectedApis();

                    if (checkSelectedApi(selApis, 1)) {
                        app.forward('/api/add/' + selApis[0].id);
                    }
                },
                onDelete: function () {

                },
                onCreateCase: function () {

                }
            });

            // load data
            getList(angular.copy($scope.searchInfo));
        }
    ]);

});