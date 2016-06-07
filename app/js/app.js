define(['routes','services/dependencyResolverFor', 'servicesConfig'], function(config, dependencyResolverFor, servicesConfig){
    var app = angular.module('app', ['ngRoute'/*, 'ngAnimate'*/]);

    app.config(
    [
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        // '$animateProvider',

        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide/*, $animateProvider*/) {
	        app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;
            // app.animation  = $animateProvider.register;

            // $locationProvider.html5Mode(true);

            if(config.routes !== undefined) {
                angular.forEach(config.routes, function(route, path) {
                    $routeProvider.when(path, {
                        templateUrl: route.templateUrl, 
                        resolve: dependencyResolverFor(route.dependencies, route, path)
                    });
                });
            }

            if(config.defaultRoutePaths !== undefined) {
                $routeProvider.otherwise({redirectTo:config.defaultRoutePaths});
            }
        }
    ]).value('SERVICESCONFIG', servicesConfig).run(function ($http, $rootScope) {
        /**
         * 全局popup提示显示影藏逻辑
         * @type {Boolean}
         */
        angular.extend($rootScope, {
            showLoading: false,
            showGlobalPopup: false,
            title: '友情提示',
            popupMsg: 'Hey man something wrong....'
        });

        $rootScope.$watch('showGlobalPopup', function(newValue, oldValue) {
            $('#errorMessage').modal(newValue ? 'show' : 'hide');
        });

        $rootScope.closePopup = function () {
            $rootScope.showGlobalPopup = false;
        };

        app.showPopup = function (msg) {
            $rootScope.showGlobalPopup = true;
            $rootScope.popupMsg = msg || $rootScope.popupMsg;
        };

        app.forward = function (hash) {
            location.hash = hash;
        };

        window.APP = app;

        // 用户名
        // $http.get('/api/user/getCurrentUser').success(function (data, status, headers, config) {
        //     $rootScope.userInfo = {
        //         userName: data.data
        //     };
        // }).error(function (data, status) {
        //     $rootScope.showLoading = false;
        //     // if (status === 0) {
        //     //     location.href = '/api/main?page=' + location.hash;
        //     // }
        // });
    });

    app.filter('htmlspecialchars', function () {
        return function (input, maxLength) {
            input = input || '';
            maxLength = maxLength || input.length;

            return input.replace(/<(^<+)>/gi, '').substr(0, maxLength);
        };
    });

    // app.animation('.page-animation', function () {
    //     return {
    //         enter: function (element, done) {
    //             element.css({
    //                 opacity: 1,
    //                 position: "relative",
    //                 top: 0,
    //                 left: '100%',
    //                 transform: 'translateY(-100%)',
    //                 marginTop: 0
    //             }).animate({
    //                 top: 0,
    //                 left: 0,
    //                 opacity: 1
    //             }, 1000, function () {
    //                 element.css('transform', 'translateY(0)');
    //                 element.css('marginTop', 70);
    //                 done();   
    //             });
    //             // done();
    //         },
    //         leave: function (element, done) {
    //             element.css({
    //                 // opacity: 1,
    //                 position: "relative",
    //                 top: 0,
    //                 left: 0
    //             }).animate({
    //                 // opacity: 0,
    //                 top: 0,
    //                 left: "-100%"
    //             }, 1000, done);
    //             // done();
    //         },
    //         move: function (element, done) {
    //             console.log('move');
    //             done();
    //         },
    //         addClass: function () {

    //         },
    //         removeClass: function () {

    //         }
    //     };
    // });



   return app;
});