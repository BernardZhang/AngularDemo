define(['app'], function (app) {
    app.directive('spliter', function() {
        var link = function (scope, element, attrs) {
            console.log('pagination link', scope, element, attrs);
            var splitterLine = $(element).find('spliter-line');
            var isMousedown = false;
            var startPos = 0;
            var delt = 0;
            var leftArea = $(element).find('.spliter-left');
            var mouseMoveHandle = function (e) {
                e.preventDefault();
                if (isMousedown) {
                    delt = startPos - e.pageX;
                    leftArea.width(leftArea.width() - delt);
                    startPos = e.pageX;
                    console.log(delt, leftArea.width());
                }
            };
            var mouseupHandle = function (e) {
                isMousedown = false;
                $(document).off('mousemove', mouseMoveHandle);
                $(document).off('mouseup', mouseupHandle);
            };

            angular.extend(
                scope,
                {
                    mousedown: function (e) {
                        isMousedown = true;
                        startPos = e.pageX;
                        $(document).on('mousemove', mouseMoveHandle);
                        $(document).on('mouseup', mouseupHandle);
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
