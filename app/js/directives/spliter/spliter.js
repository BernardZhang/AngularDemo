define(['app'], function (app) {
    app.directive('spliter', function() {
        var link = function (scope, element, attrs) {
            console.log('pagination link', scope, element, attrs);
            var splitterLine = $(element).find('spliter-line');
            var isMousedown = false;
            var startPos = 0;
            var delt = 0;
            var leftArea = $(element).find('.spliter-left');

            

            $(document).on('mousemove', function (e) {
                e.preventDefault();
                if (isMousedown) {
                    delt = startPos - e.pageX;
                    leftArea.width(leftArea.width() - delt);
                    startPos = e.pageX;
                    console.log(delt, leftArea.width());
                }
            });

            $(document).on('mouseup', function () {
                isMousedown = false;
            });

            angular.extend(
                scope,
                {
                    mousedown: function (e) {
                        isMousedown = true;
                        startPos = e.pageX;
                    },
                    mousemove: function (e) {
                        e.preventDefault();
                        // if (isMousedown) {
                        //     delt = startPos - e.pageX;
                        //     leftArea.width(leftArea.width() + delt);
                        //     startPos = e.pageX;
                        //     console.log(delt, leftArea.width());
                        // }
                    },
                    mouseup: function (e) {
                        // isMousedown = false;
                    }
                }
            );
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                pageInfo: '=info',
                onChange: '&'
            },
            templateUrl: 'js/directives/spliter/spliter.html',
            link: link
        };
    });
});
