/**
 * @fileOverview  Tree view UI Component
 * author zhangyou
 */
define(['app'], function (app) {
	app.directive('treeview', function () {
        var findNode = function (node, nodes, callback, parentNode) {
            var result = null;

            for (var i = 0, len = nodes.length; i < len; i++) {
                if (nodes[i].id + '' === node.id + '') {
                    result = nodes[i];
                    callback && callback(i, nodes);
                } else {
                    parentNode = node;
                    result = findNode(node, nodes[i].children || [], callback);
                }

                if (result) {
                    return result;
                }
            }

            return result;
        };
        var goThroughNodes = function (nodes, callback) {
            if (typeof callback !== 'function') {
                return;
            }

            (nodes || []).forEach(function (node, i) {
                if (callback(node)) {
                    return;
                } else {
                    goThroughNodes(node.children, callback);
                }
            });
        };
       
        var link = function (scope, element, attrs) {
            scope.animation = !!attrs.animation;
            // events
            angular.extend(
                scope,
                {
                    toggle: function (node) {
                        node.isCollapsed = !node.isCollapsed;
                        scope.onToggleExpand && scope.onToggleExpand() && scope.onToggleExpand()(node);
                    },
                    edit: function (node, nodes, e) {
                        goThroughNodes(nodes, function (node) {
                            console.log(node.id);
                            node.isEdit = false;
                        });
                        node.isEdit = true;
                        scope.onEdit && scope.onEdit(node);
                    },
                    del: function (node, nodes) {
                        findNode(node, nodes, function (index, nodes) {
                            nodes.splice(index, 1);
                        });
                        scope.onDelete && scope.onDelete(node);
                    },
                    select: function (node, nodes) {
                        if (attrs.multipleSelection === true) {
                            node.isSelected = true;
                        } else {
                            goThroughNodes(nodes, function (node) {
                                console.log(node.id);
                                node.isSelected = false;
                            });
                        }
                        node.isSelected = true;
                        scope.onSelect && scope.onSelect() && scope.onSelect()(node);
                    },
                    finishEdit: function (node) {
                        console.log('blur');
                        node.isEdit = false;
                        console.log(node);
                    },
                    inputKeyup: function (node, e) {
                        console.log('keyup', e);
                        if (e.keyCode === 13) {
                            this.finishEdit(node, e);
                        }
                    },
                    dragStart: function (node, nodes, e) {
                        e.originalEvent.dataTransfer.setData('id', node.id);
                        e.handleObj.data = node;

                    },
                    dragOver: function (node, nodes, e) {
                        e.preventDefault();
                    },
                    drop: function (node, nodes, e) {
                        console.log(e.originalEvent.dataTransfer.getData('id'));
                        console.log(e.handleObj);
                    }
                }
            );
            
            var isDraging = false;
            var dragHandler = function (e) {
                isDraging = true;
                console.log('dragstart');
                var target = $(e.currentTarget);
                var nodeId = target.data('id');

                e.originalEvent.dataTransfer.setData('id', nodeId);
                scope.onDragStart && scope.onDragStart() && scope.onDragStart()(findNode({ id: id }));
            };
            var dragoverHandler = function (e) {
                e.preventDefault();

                console.log('dragover', e.originalEvent.dataTransfer.getData('id'));
            };
            var dragendHandler = function (e) {
                console.log('drag end', e.originalEvent.dataTransfer.getData('id'));
                if (e.originalEvent.dataTransfer.getData('id')) {
                    console.log('aaa');
                }
                isDraging = false;
            };
            var dropHandler = function (e) {
                var target = $(e.currentTarget);
                var nodeId = target.data('id');
                var dragNodeId = e.originalEvent.dataTransfer.getData('id');
                var dragHandler = scope.onDrop && scope.onDrop();
                var INSERT_TYPE = {
                    BEFORE: 1, // 前兄弟节点插入
                    IN: 2, // 子节点插入
                    AFTER: 3 // 后兄弟节点插入
                };
                var moveNode = function (nodeId, dropNodeId, nodes, insertType) {
                    if (isDraging) {
                        var parentNode = null;
                        var node = findNode({ id: nodeId }, nodes, parentNode);
                        var dragNode = findNode({ id: dragNodeId }, nodes, function (index, children) {
                            children.splice(index, 1);
                        });
                        console.log(node, dragNode);
                        console.log(':)' + insertType);

                        if (node && dragNode) {
                            switch (insertType) {
                                case INSERT_TYPE.BEFORE:
                                    if (parentNode) {
                                        parentNode.children.unshift(dragNode);
                                    } else {
                                        scope.nodes.unshift(dragNode);
                                    }
                                    break;
                                case INSERT_TYPE.IN:
                                    node.children = node.children || [];
                                    node.children.push(dragNode);
                                    break;
                                case INSERT_TYPE.AFTER:
                                    if (parentNode) {
                                        parentNode.children.push(dragNode);
                                    } else {
                                        scope.nodes.push(dragNode);
                                    }
                            }
                            
                        }
                    }
                };

                e.preventDefault();
                EV = e;
                T = e.currentTarget;
                console.log(e);
                console.log(e.currentTarget);
                // drop位置边界值判断，如果drop在元素竖直方向的中间区域，则将drop节点作为其子节点加入
                // 若在中间偏上的位置则作为前兄弟节点， 若在中间位置偏下则作为后兄弟节点加入
                var rect = target[0].getBoundingClientRect();
                var eventPos = {
                    x: e.originalEvent.pageX,
                    y: e.originalEvent.pageY 
                };
                var height = rect.height;
                var offsetY = eventPos.y - rect.top;
                var start = height / 4;
                var end = (height / 4) * 3;
                var inserType = INSERT_TYPE.IN;

                // 如果是拖拽的节点，drop到自己则不做任何处理
                // 如果外部传了onDrag回调且返回true,则表明不需要内部的移动节点处理
                if (nodeId == dragNodeId || dragHandler && !dragHandler(findNode({ id: id }))) {
                    return;
                }

                // 中间区域 作为孩子节点插入
                if (offsetY >= start && offsetY <= end) {
                    inserType = INSERT_TYPE.IN;
                }

                // 中间偏上 作为前兄弟节点插入
                if (offsetY < start) {
                    inserType = INSERT_TYPE.BEFORE;
                }

                // 中间偏下 作为后兄弟节点插入
                if (offsetY > end) {
                    inserType = INSERT_TYPE.AFTER;
                }
                scope.$apply(function () {
                    moveNode(nodeId, dragNodeId, scope.nodes, inserType);
                });
            };

            // add drag & drop events
            $(element).on('dragstart', '.node-info', dragHandler);
            $(element).on('dragover', '.node-info', dragoverHandler);
            $(element).on('dragend', '.node-info', dragendHandler);
            $(element).on('drop', '.node-info', dropHandler);
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                nodes: '=data',
                onToggleExpand: '&',
                onEdit: '&',
                onDelete: '&',
                onSelect: '&',
                onDragStart: '&',
                onDrop: '&'
            },
            templateUrl: 'js/directives/tree/tree.html',
            link: link
        };
    });
});