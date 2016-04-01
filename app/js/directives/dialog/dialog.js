define(['app'], function (app) {
	app.directive('dialog', function() {
		var toggle = function (element, scope, isShow) {
				$(element).modal(isShow ? 'show' : 'hide');
			},
			link = function (scope, element, attrs) {
				angular.extend(scope, {
					cancel: function (e) {
						toggle(element, scope, false);
					},
					close: function (e) {
						toggle(element, scope, false);
					},
					ok: function (e) {
						if (!scope.dlgInfo.preventClose) {
							toggle(element, scope, false);	
						}
						
						scope.onOk && scope.onOk() && scope.onOk()(scope);
					},
					next: function (e) {
						if (!scope.dlgInfo.preventClose) {
							toggle(element, scope, false);	
						}
						
						scope.onNext && scope.onNext() && scope.onNext()(scope);
					}
				});

				scope.$watch('dlgInfo.show', function(isShow, oldValue) {
				    toggle(element, scope, isShow);
				});

				$(element).on('hidden.bs.modal', function () {
					scope.$apply(scope.dlgInfo.show = false);
				});
			};

	    return {
	        restrict: 'E',
	        replace: true, // Replace with the template below
    		transclude: true, // we want to insert custom content inside the directive
	        scope: {
	            dlgInfo: '=info',
	            onCancel: '&',
	            onClose: '&',
	            onOk: '&',
	            onNext: '&'
	        },
	        templateUrl: 'js/directives/dialog/dialog.html',
	        link: link
	    };
	});
});


