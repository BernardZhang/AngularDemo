define(['app'], function(app)
{
	app.controller('AppController',
    [
        '$scope',

        function($scope)
        {
            $scope.page =
            {
                heading: 'App'
            };
        }
    ]);
});