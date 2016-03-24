define(['app', 'BaseModel',], function (app, BaseModel) {
	app.controller('CaseController', [
        '$scope',
        '$routeParams',
        'BaseModel',
        'SERVICESCONFIG',

        function ($scope, $routeParams, BaseModel, SERVICESCONFIG) {
            var caseModel = new BaseModel(SERVICESCONFIG.CASE),
                moduleModel = new BaseModel(SERVICESCONFIG.MODULE);

            angular.extend($scope, {
                getDisplayType: function (type) {
                    type = +type;
                    return type === 1 ? '功能' : (type === 2 ? '异常' : '方法');
                },
                removeHtmlTag: function (html) {
                    return html.replace(/<(^<+)>/gi, '');
                }
            }, $routeParams);

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

                },
                onResult: function () {

                },
                onDowload: function () {

                },
                onCopy: function () {

                }
            });

            caseModel.getList($routeParams, function (data) {
                angular.extend($scope, {
                    cases: data || []
                });
            });

            moduleModel.getList(null, function (data) {
                angular.extend($scope, {
                    modules: data || []
                });
            });
        }
    ]);
});