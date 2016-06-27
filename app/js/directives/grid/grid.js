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
                        scope: {
                            cols: '=',
                            rows: '='
                        },
                        templateUrl:  'js/directives/grid/grid.html',
                        link: function (scope, element, attrs) {
                            var resizerDown = false;
                            var startX = 0;
                            var colIndex = 0;
                            var width;
                            var minTableWidth;
                            var colPaddingLeft = 0;
                            var getWidthWithPX = function (dom) {
                                return parseInt(dom.css('width'), 10) + increase + 'px';
                            };
                            var setColWidthByIndex = function (index, increase) {
                                var headerTr = $(element).find('.grid-header tr');
                                var invisibleRow = $(element).find('.invisible-row');
                                var col = invisibleRow.find('th').eq(index);
                                var headerCol = headerTr.find('td').eq(index);
                                var resizer = headerCol.find('.col-resizer');

                                width += increase;
                                col.css({
                                    width: width
                                });
                                headerCol.css({
                                    width: width
                                });
                                resizer.css({
                                    marginLeft: width - colPaddingLeft - 2 + 'px'
                                });

                                if (increase < 0
                                    && headerTr.width() <= minTableWidth) {
                                    var lastTd = headerTr.find('td').last();
                                    var lastTh = invisibleRow.find('th').last();
                                    lastTd.css({
                                        width: getWidthWithPX(lastTd)
                                    });
                                    lastTh.css({
                                        width: getWidthWithPX(lastTh)
                                    });
                                }
                            };
                            var mousemoveHandle = function (evt) {
                                if (resizerDown) {
                                    evt.preventDefault();
                                    startX = evt.pageX;
                                    setColWidthByIndex(colIndex, evt.pageX - startX);
                                }
                            };
                            var mouseupHandle = function () {
                                resizerDown = false;
                                document.removeEventListener('mousemove', mousemoveHandle);
                                document.removeEventListener('mouseup', mouseupHandle);
                            };

                            if (attrs.height) {
                                $(element).height(attrs.height);
                            }
                            
                            // resize event
                            angular.extend(
                                scope,
                                {
                                    resizeMovedown: function (index, evt) {
                                        startX = evt.pageX;
                                        resizerDown = true;
                                        colIndex = index;
                                        width = getWidthWithPX($(element).find('.grid-header td').eq(index));
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
                                    colPaddingLeft = parseInt(gridCols.eq(0).css('paddingLeft'), 10);
                                    invisibleCols.each(function (i, item) {
                                        width =  getWidthWithPX(gridCols.eq(i));
                                        $(item).css('width', width);
                                        gridCols.eq(i).css('width', width);
                                        gridCols.eq(i).find('.col-resizer').css({
                                            marginLeft: (width - colPaddingLeft - 2) + 'px'
                                        });
                                        colsWidth[i] = width;
                                    });
                                    minTableWidth = getWidthWithPX($(element));
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