define(
    ['app'],
    function (app) {
        app.directive(
            'uiButton',
            function () {
                return {
                    scope: {
                        text: '='
                    },
                    template: '<button>{{text}}</button>',
                    link: function (scope, element, attrs) {
                        console.log('button', scope, element, attrs);
                    }
                };
            }
        );
    }
);
