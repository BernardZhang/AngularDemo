define(['app'], function(app)
{
	app.controller('UserController',
    [
        '$scope',

        function($scope)
        {
            $scope.page =
            {
                heading: 'Welcome'
            };
        }
    ]);
});