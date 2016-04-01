define([], function() {
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/views/index.html',
                dependencies: [
                    'controllers/index/IndexController'
                ]
            },
            '/index': {
                templateUrl: '/views/index/index.html',
                dependencies: [
                    'controllers/index/IndexController'
                ]
            },
            '/api': {
                templateUrl: '/views/api/api.html',
                dependencies: [
                    'controllers/api/ApiController',
                    'directives/pagination'
                ]
            },
            '/api/add/:id?': {
                templateUrl: '/views/api/add.html',
                dependencies: [
                    'controllers/api/AddController'
                ]
            },
            '/data/:id?/:key?/:value?': {
                templateUrl: '/views/data/dlist.html',
                dependencies: [
                    'controllers/data/DataController',
                    'directives/pagination',
                    'directives/dialog'
                ]
            },
            '/case/:id?/:desc?/:owner?/:type?/:apiId?/:apiPath?/:mid?': {
                templateUrl: '/views/case/clist.html',
                dependencies: [
                    'controllers/case/CaseController'
                ]
            },
            '/plan/:id?/:desc?/:owner?': {
                templateUrl: '/views/plan/plist.html',
                dependencies: [
                    'controllers/plan/PlanController',
                    'directives/pagination',
                    'directives/dialog'
                ]
            },
            '/module': {
                templateUrl: '/views/manage/module.html',
                dependencies: [
                    'controllers/manage/ModuleController'
                ]
            },
            '/help': {
                templateUrl: '/views/help/index.html',
                dependencies: [
                    'controllers/help/HelpController'
                ]
            },
            '/user': {
                templateUrl: '/views/user.html',
                dependencies: [
                    'controllers/usercenter/UserController'
                ]
            },
            '/app': {
                templateUrl: '/views/app.html',
                dependencies: [
                    'controllers/manage/AppController'
                ]
            },
            '/test': {
                templateUrl: '/views/test.html',
                dependencies: [
                    'controllers/TestController'
                ]
            },
            '/directives': {
                templateUrl: '/views/directives.html',
                dependencies: [
                    'controllers/TestDirectivesController',
                    'directives/pagination/pagination',
                    'directives/dialog/dialog',
                    'directives/messagebar/messageBar',
                    'directives/tree/tree',
                    'directives/setFocus'
                ]
            }
        }
    };
});