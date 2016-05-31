/**
 * @fileOverview  Mindmap view UI Component
 * author zhangyou
 */
define(['app'], function (app) {
    app.directive('mindmap', function () {
        var link = function (scope, element, attrs) {
            var isMultiple = !!attrs.multiple;
            var expandLevel = attrs.expandlevel;

            // 相关属性参数初始化
            scope.animation = !!attrs.animation;
            scope.id = attrs.key || 'id';
            scope.name = attrs.name || 'name';
            scope.children = attrs.children || 'children';

            if (isMultiple) {
                scope.selectedNodes = [];
            } else {
                scope.selectedNode = null;
            }

            scope.isExpand = function (collapsed, level) {
                if (typeof collapsed === 'undefined' && typeof expandLevel !== 'undefined') {
                    return level < +expandLevel;
                }

                return !collapsed;
            };

            // events
            angular.extend(
                scope,
                {
                    toggle: function (node, level) {
                        node.collapsed = scope.isExpand(node.collapsed, level);

                        var toggleHandle = scope.onToggleExpand && scope.onToggleExpand();
                        toggleHandle && toggleHandle(node);
                    },
                    select: function (node) {
                        node.selected = !node.selected;
                        if (isMultiple) {
                            if (node.selected) {
                                scope.selectedNodes.push(node);
                            } else {
                                scope.selectedNodes.splice(scope.selectedNodes.indexOf(node), 1);
                            }
                        } else {
                            if (node.selected) {
                                if (scope.selectedNode) {
                                    scope.selectedNode.selected = false;
                                }
                                scope.selectedNode = node;
                            } else {
                                scope.selectedNode = null;    
                            }
                        }

                        var selectHandle = scope.onSelect && scope.onSelect();
                        selectHandle && selectHandle(node, scope[isMultiple ? 'selectedNodes' : 'selectedNode']);
                    }
                }
            );
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=data',
                onToggleExpand: '&',
                onSelect: '&'
            },
            templateUrl: 'js/directives/mindmap/mindmap.html',
            link: link
        };
    });
});