define([], function () {
    return function (dependencies, route, path) {
        var definition = {
            resolver: ['$q','$rootScope', function ($q, $rootScope) {
                var deferred = $q.defer();

                require(dependencies, function() {
                    $rootScope.$apply(function() {
                        $rootScope.currentView = path;
                        console.log($rootScope.currentView);
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            }]
        };

        return definition;
    };
});