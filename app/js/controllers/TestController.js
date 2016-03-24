/**
 * Test controller
 * create by zhangyou04 02/23
 */
define(['app', 'BaseModel', 'ZTree'], function(app, BaseModel, ZTree) {
    app.controller('TestController', [
        '$scope',
        '$routeParams',
        'BaseModel',
        'SERVICESCONFIG',
        function($scope, $routeParams, BaseModel, SERVICESCONFIG) {
            var setting = {
                treeId: '',
                treeObj: null,
                async: {

                },

                check: {
                    enable: true,
                    chkStyle: "radio"
                },
                data: {
                    key: {
                        title: "title"
                    },
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onCheck: onCheck,
                    onDrag: eventHandlerLog,
                    onDrop: eventHandlerLog,
                    onClick: eventHandlerLog,
                    onCollapse: eventHandlerLog,
                    onExpand: eventHandlerLog
                },
                edit: {
                    drag: {},
                    enable: true
                }
            };

            function eventHandlerLog() {
                console.log(arguments);
            }


            var zNodes =[
                { id:1, pId:0, name:"父节点1", title:"", checked:true, open:true},
                { id:11, pId:1, name:"父节点11", title:"", checked:true},
                { id:111, pId:11, name:"叶子节点111", title:"", checked:true, isHidden:true},
                { id:112, pId:11, name:"叶子节点112", title:""},
                { id:113, pId:11, name:"叶子节点113", title:""},
                { id:12, pId:1, name:"父节点12", title:"", isHidden:true},
                { id:121, pId:12, name:"叶子节点121", title:""},
                { id:122, pId:12, name:"叶子节点122", title:"", isHidden:true},
                { id:123, pId:12, name:"叶子节点123", title:""},
                { id:2, pId:0, name:"父节点2", title:""},
                { id:21, pId:2, name:"父节点21", title:"", isHidden:true},
                { id:211, pId:21, name:"叶子节点211", title:""},
                { id:212, pId:21, name:"叶子节点212", title:""},
                { id:213, pId:21, name:"叶子节点213", title:""},
                { id:22, pId:2, name:"父节点22", title:""},
                { id:221, pId:22, name:"叶子节点221", title:""},
                { id:222, pId:22, name:"叶子节点222", title:""},
                { id:223, pId:22, name:"叶子节点223", title:""}
            ];

            $.fn.zTree.init($("#ztree-box-1"), setting, zNodes);

            function onCheck(e, treeId, treeNode) {
                count();
            }

            function setTitle(node) {
                var zTree = $.fn.zTree.getZTreeObj("ztree-box-1");
                var nodes = node ? [node]:zTree.transformToArray(zTree.getNodes());
                for (var i=0, l=nodes.length; i<l; i++) {
                    var n = nodes[i];
                    n.title = "[" + n.id + "] isFirstNode = " + n.isFirstNode + ", isLastNode = " + n.isLastNode;
                    zTree.updateNode(n);
                }
            }
            function count() {
                function isForceHidden(node) {
                    if (!node.parentTId) return false;
                    var p = node.getParentNode();
                    return !!p.isHidden ? true : isForceHidden(p);
                }
                var zTree = $.fn.zTree.getZTreeObj("ztree-box-1"),
                checkCount = zTree.getCheckedNodes(true).length,
                nocheckCount = zTree.getCheckedNodes(false).length,
                hiddenNodes = zTree.getNodesByParam("isHidden", true),
                hiddenCount = hiddenNodes.length;

                for (var i=0, j=hiddenNodes.length; i<j; i++) {
                    var n = hiddenNodes[i];
                    if (isForceHidden(n)) {
                        hiddenCount -= 1;
                    } else if (n.isParent) {
                        hiddenCount += zTree.transformToArray(n.children).length;
                    }
                }

                $("#isHiddenCount").text(hiddenNodes.length);
                $("#hiddenCount").text(hiddenCount);
                $("#checkCount").text(checkCount);
                $("#nocheckCount").text(nocheckCount);
            }
            function showNodes() {
                var zTree = $.fn.zTree.getZTreeObj("ztree-box-1"),
                nodes = zTree.getNodesByParam("isHidden", true);
                zTree.showNodes(nodes);
                setTitle();
                count();
            }
            function hideNodes() {
                var zTree = $.fn.zTree.getZTreeObj("ztree-box-1"),
                nodes = zTree.getSelectedNodes();
                if (nodes.length == 0) {
                    alert("请至少选择一个节点");
                    return;
                }
                zTree.hideNodes(nodes);
                setTitle();
                count();
            }


            angular.extend($scope, {
                selected: 'world',
                items: ['hello', 'world'],

                selected2: { id: 2, name: 'world' },
                items2: [
                    { id: 1, name: 'hello' },
                    { id: 2, name: 'world' }
                ],

                selected3: { id: 2, name: { name: 'world' } },
                items3: [
                    { id: 1, name: { name: 'hello' } },
                    { id: 2, name: { name: 'world' } }
                ]
            });

            // $(document).ready(function(){
                
            //     $("#hideNodesBtn").bind("click", {type:"rename"}, hideNodes);
            //     $("#showNodesBtn").bind("click", {type:"icon"}, showNodes);
            //     setTitle();
            //     count();
            // });
    
        }
    ]);
});