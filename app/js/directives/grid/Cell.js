define(
    ['app'],
    function (app) {
        app.directive(
            'gridCell',
            [
                function () {
                    return {
                        replace: true,
                        scope: {
                            'data': '='
                        },
                        link: function (scope, element, attrs) {
                            console.log('Cell', scope.data, element[0], attrs);
                        }
                    };
                }
            ]
        );
    }
);