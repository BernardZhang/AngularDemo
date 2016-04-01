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
            
        }
    ]);
});