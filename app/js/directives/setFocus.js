define(['app'], function (app) {
    app.directive('setFocus', function () {
        return function (scope, element) {
            console.log('setFocus', element);
            element[0].focus();
        };
    });
});