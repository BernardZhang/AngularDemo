define(
    ['app'],
    function (app) {
        app.directive(
            'grid',
            [
                '$timeout',
                function ($timeout) {
                    return {
                        restrict: 'AE',
                        replace: true,
                        // transclude:true,
                        scope: {
                            cols: '=',
                            rows: '='
                        },
                        templateUrl:  'js/directives/grid/grid.html',
                        link: function (scope, element, attrs) {
                            var resiseDown = false;
                            var startX = 0;
                            var colIndex = 0;
                            var width;
                            var setColWidthByIndex = function (index, increase) {

                                var col = $(element).find('.invisible-row th').eq(index);
                                var headerCol = $(element).find('.grid-header td').eq(index);
                                // var colWidth = col.width() + increase;
                                console.log(headerCol.width());
                                // width = headerCol.width();
                                width += increase;
                                var headerWidth = headerCol.width() + increase;
                                console.log('increase', headerWidth, increase);
                                console.log(width);
                                col.css({
                                    width: width,
                                    maxWidth: width
                                })
                                // col.width(width);
                                headerCol.css({
                                    width: width,
                                    maxWidth: width
                                });
                            };
                            var mousemoveHandle = function (evt) {
                                // console.log('drag', colIndex, evt);
                                evt.preventDefault();
                                if (resiseDown) {
                                    var delt = evt.pageX - startX;
                                    // scope.colWidths[index] += delt;
                                    startX = evt.pageX;
                                    setColWidthByIndex(colIndex, delt);
                                }
                            };
                            var mouseupHandle = function () {
                                resiseDown = false;
                                console.groupEnd(colIndex);
                                document.removeEventListener('mousemove', mousemoveHandle);
                                document.removeEventListener('mouseup', mouseupHandle);
                            };
                            // resize event
                            angular.extend(
                                scope,
                                {
                                    resizeMovedown: function (index, evt) {
                                        console.log('move', index, evt);
                                        startX = evt.pageX;
                                        resiseDown = true;
                                        colIndex = index;
                                        width = $(element).find('.grid-header td').eq(index).width();
                                        console.group(colIndex);
                                        document.addEventListener('mousemove', mousemoveHandle);
                                        document.addEventListener('mouseup', mouseupHandle);
                                    }
                                }
                            );
                            $timeout(
                                function () {
                                    var invisibleCols = $(element).find('.invisible-row th');
                                    var gridCols = $(element).find('.grid-header td');
                                    var widths = [];
                                    var width;
                                    invisibleCols.each(function (i, item) {
                                        width = gridCols.eq(i).width();
                                        $(item).width(width);
                                        gridCols.eq(i).width(width);
                                        gridCols.eq(i).find('.col-resizer').css({
                                            marginLeft: (width - 3) + 'px'
                                        });
                                        widths.push(gridCols.eq(i).width());
                                    });
                                    // scope.colWidths = widths;
                                },
                                25
                            );
                            
                        }
                    };  
                }
            ]
        );
    }
);