define(
	['app'],
	function (app) {
		app.directive(
			'layout',
			function () {
				return {
					link: function (scope, element, attrs) {
						angular.element(element).addClass('ui-layout');
					}
				};
			}
		).directive(
			'layoutTop',
			function () {
				return {
					link: function (scope, element, attrs) {
						angular.element(element).addClass('ui-layout-top');
					}
				};
			}
		).directive(
			'hspliter',
			function () {
				return {
					link: function (scope, element, attrs) {
						angular.element(element).addClass('ui-layout-hspliter');
					}
				};
			}
		).directive(
			'vspliter',
			function () {
				return {
					link: function (scope, element, attrs) {
						angular.element(element).addClass('ui-layout-vspliter');
					}
				};
			}
		).directive(
			'layoutCenter',
			function () {
				return {
					link: function (scope, element, attrs) {
						angular.element(element).addClass('ui-layout-center');
					}
				};
			}
		).directive(
			'layoutLeft',
			function () {
				return {
					link: function (scope, element, attrs) {
						angular.element(element).addClass('ui-layout-left');
					}
				}
			}
		).directive(
			'layoutRight',
			function () {
				return {
					link: function (scope, element, attrs) {
						angular.element(element).addClass('ui-layout-right');
					}
				}
			}
		).directive(
			'layoutBottom',
			function () {
				return {
					link: function (scope, element, attrs) {
						angular.element(element).addClass('ui-layout-bottom');
					}
				}
			}
		);
	}
);