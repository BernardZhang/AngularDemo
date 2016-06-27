/**
 * @file Test directives controller
 * @author zhangyou04 02/23
 */
define(['app', 'BaseModel'], function(app, BaseModel) {
    app.controller('TestDirectivesController', [
        '$scope',
        '$routeParams',
        'BaseModel',
        'SERVICESCONFIG',
        function($scope, $routeParams, BaseModel, SERVICESCONFIG) {
            // directivs list
            angular.extend(
                $scope,
                {
                    directives: [
                        {
                            name: 'Dialog'
                        },
                        {
                            name: 'Pagination'
                        },
                        {
                            name: 'TreeView'
                        },
                        {
                            name: 'Mindmap'
                        },
                        {
                            name: 'HeaderView'
                        },
                        {
                            name: 'NavigationBar'
                        }
                    ]
                }
            );
            // dialog 
            // 
            

            // pagination
            angular.extend(
                $scope,
                {
                    pagination: {
                        info: {
                            currentPage: 1,
                            total: 50,
                            pageSize: 5
                        },
                        onOk: function () {
                            console.log('onOk');
                        },
                        onClose: function () {
                            console.log('onClose');
                        },
                        onCancel: function () {
                            console.log('onCancel');
                        },
                        pageChanged: function (page) {
                            console.log(page);
                        }
                    }
                }
            );

            // messagebar 
            angular.extend(
                $scope,
                {
                    messagebar: {
                        info: {
                            show: true,
                            type: 'success',
                            msg: 'success message bar'
                        },
                        onClose: function (e) {
                            console.log('onClose', e);
                        }
                    }
                }
            );

            // treeview
            angular.extend(
                $scope,
                {
                    treeview: {
                        data: [
                            {
                               id: 1,
                               name: 'node1',
                               children: [
                                   {
                                       id: 11,
                                       name: 'node11',
                                       children: [
                                            {
                                               id: 111,
                                               name: 'node111' 
                                            },
                                            {
                                               id: 112,
                                               name: 'node112' 
                                            }
                                       ]     
                                   },
                                   {
                                       id: 12,
                                       name: 'node12',
                                       children: [
                                            {
                                               id: 121,
                                               name: 'node121' 
                                            },
                                            {
                                               id: 122,
                                               name: 'node122' 
                                            }
                                       ]     
                                   }  
                               ] 
                            },
                            {
                               id: 2,
                               name: 'node2',
                               children: [
                                   {
                                       id: 21,
                                       name: 'node21',
                                       children: [
                                           {
                                               id: 211,
                                               name: 'node211' 
                                           }
                                       ]     
                                   } 
                               ] 
                            }
                        ],
                        selectItem: function (node) {
                            console.log(node);
                        },
                        toggleExpand: function (node) {
                            console.log(node);
                        }
                    }
                }
            );

            angular.extend(
                $scope,
                {
                    treeview2: angular.copy($scope.treeview)
                }
            );

            // mindmap
            angular.extend(
                $scope,
                {
                    mindmap: {
                        data: {
                            id: '1',
                            name: 'node1',
                            children: [
                                {
                                    id: '11',
                                    name: 'node11',
                                    children: [
                                        {
                                            id: '111',
                                            name: 'node111',
                                            children: [
                                                {
                                                    id: '1111',
                                                    name: 'node-1111',
                                                    children: [
                                                        {
                                                            id: '11111',
                                                            name: 'node-11111'
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: '1112',
                                                    name: 'node-1112',
                                                    children: [
                                                        {
                                                            id: '11121',
                                                            name: 'node-11121'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: '112',
                                            name: 'node112',
                                            children: [
                                                {
                                                    id: '1121',
                                                    name: 'node-1121',
                                                    children: [
                                                        {
                                                            id: '11211',
                                                            name: 'node-11211'
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: '1122',
                                                    name: 'node-1122',
                                                    children: [
                                                        {
                                                            id: '11221',
                                                            name: 'node-11221'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            id: '112',
                                            name: 'node112'
                                        }
                                    ]
                                }
                            ]
                        },
                        selectNode: function (node, selectedNode) {
                            console.log('selectNode', node, selectedNode);
                            $scope.mindmap.selectedNode = selectedNode;
                        },
                        toggleExpand: function (node) {
                            console.log('toggleExpand', node);
                        }
                    }
                }
            );

            angular.extend(
                $scope,
                {
                    mindmap2: angular.copy($scope.mindmap)
                }
            );
            angular.extend(
                $scope.mindmap2,
                {
                    selectNode: function (node, selectedNodes) {
                        console.log('selectNode', node, selectedNodes);
                        $scope.mindmap2.selectedNodes = selectedNodes;
                    },
                    toggleExpand: function (node) {
                        console.log('toggleExpand', node);
                    } 
                }
            );


            angular.extend(
                $scope,
                {
                    grid: {
                        cols: [
                            {
                                key: 'col1',
                                name: 'Column1'
                            },
                            {
                                key: 'col2',
                                name: 'Column2'
                            },
                            {
                                key: 'col3',
                                name: 'Column3'
                            }
                        ],
                        rows: [
                            {
                                col1: 'Hello1',
                                col2: 'Hello2',
                                col3: 'Hello3'
                            }
                        ]
                    }
                }
            );
            
        }
    ]);
});