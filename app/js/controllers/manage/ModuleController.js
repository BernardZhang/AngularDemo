define(['app'], function(app)
{
	app.controller('ModuleController',
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