define(['app'], function (app) {
    app.directive('onDrag', function () {
        return function (scope, element) {
            console.log('setFocus', element);
        };
    });
});