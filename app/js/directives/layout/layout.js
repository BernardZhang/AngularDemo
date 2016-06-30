define(
	['app'],
	function (app) { 
		app.directive(
			'layout',
			[
				'$compile',
				function ($compile) {
					return {
						link: function (scope, element, attrs) {
							angular.element(element).addClass('ui-layout');
							var direction = attrs.direction || 'vertical';
							angular.element(element).addClass('layout-' + direction);
							if (attrs.height) {
								console.log('height', angular.element(element), angular.element(element).height);
								// angular.element(element).height(attrs.height);
								$(element).height(attrs.height);
							}
						},
						controller: [
							'$scope',
							'$element',
							'$attrs',
							function (scope, element, attrs) {
								console.log('controller', scope, element, attrs);
								this.getResizable = function () {
									return attrs.resizable;
								};
							}
						]
					};
				}
			]
		).directive(
			'layoutTop',
			[
				'$compile',
				function ($compile) {
					return {
						require: '^layout',
						scope: {

						},
						link: function (scope, element, attrs, layoutCtrl) {
							angular.element(element).addClass('ui-layout-top');
							if (attrs.height) {
								// angular.element(element).height(attrs.height);
								$(element).height(attrs.height);
							}

							var resizable = angular.isUndefined(attrs.resizable) ? layoutCtrl.getResizable() : attrs.resizable;
							if (resizable) {
								$($compile('<layout-spliter direction="h" target="top"/>')(scope)).insertAfter($(element));	
							}
						}
					};
				}
			]
		).directive(
			'layoutCenter',
			[
				'$compile',
				function ($compile) {
					return {
						// require: '^layout',
						link: function (scope, element, attrs/*, layoutCtrl*/) {
							angular.element(element).addClass('ui-layout-center');
							var direction = attrs.direction || 'vertical';
							angular.element(element).addClass(direction);
							if (attrs.height) {
								// angular.element(element).height(attrs.height);
								$(element).height(attrs.height);
							}

							// var resizable = angular.isUndefined(attrs.resizable) ? layoutCtrl.getResizable() : attrs.resizable;
							// if (resizable) {
							// 	$($compile('<hspliter target="bottom"/>')(scope)).insertAfter($(element));	
							// }
						}
					};
				}
			]
		).directive(
			'layoutLeft',
			[
				'$compile',
				function ($compile) {
					return {
						require: '^layout',
						link: function (scope, element, attrs, layoutCtrl) {
							angular.element(element).addClass('ui-layout-left');
							if (attrs.width) {
								// angular.element(element).width(attrs.width);
								$(element).width(attrs.width);
							}

							var resizable = angular.isUndefined(attrs.resizable) ? layoutCtrl.getResizable() : attrs.resizable;
							if (resizable) {
								$($compile('<layout-spliter direction="v" target="left"/>')(scope)).insertAfter($(element));	
							}
						}
					}
				}
			]
		).directive(
			'layoutRight',
			[
				'$compile',
				function ($compile) {
					return {
						require: '^layout',
						link: function (scope, element, attrs, layoutCtrl) {
							angular.element(element).addClass('ui-layout-right');
							if (attrs.width) {
								// angular.element(element).width(attrs.width);
								$(element).width(attrs.width);
							}

							// var resizable = angular.isUndefined(attrs.resizable) ? layoutCtrl.getResizable() : attrs.resizable;
							// if (resizable) {
							// 	$($compile('<layout-spliter direction="v" target="right"/>')(scope)).insertAfter($(element));	
							// }
						}
					}
				}
			]
		).directive(
			'layoutBottom',
			[
				'$compile',
				function ($compile) {
					return {
						require: '^layout',
						scope: {},
						link: function (scope, element, attrs, layoutCtrl) {
							angular.element(element).addClass('ui-layout-bottom');
							if (attrs.height) {
								// angular.element(element).height(attrs.height);
								$(element).height(attrs.height);
							}

							var resizable = angular.isUndefined(attrs.resizable) ? layoutCtrl.getResizable() : attrs.resizable;
							if (resizable) {
								$($compile('<layout-spliter direction="h" target="bottom"/>')(scope)).insertBefore($(element));	
							}
						}
					}
				}
			]
		).directive(
			'layoutSpliter',
			function () {
				return {
					replace: true,
					scope: {},
					template: '<div class="{{direction}}spliter" ng-mousedown="mousedownHandle($event)"></div>',
					link: function (scope, element, attrs) {
						var targetLayout;
						var rect = {
							height: 0,
							width: 0
						};
						var startPos = {
							x: 0,
							y: 0
						};
						var direction = attrs.direction;
						var isHorizontal = direction === 'h';
						var target = attrs.target || (isHorizontal ? 'top' : 'left');
						var mousemoveHandle = function (evt) {
							evt.preventDefault();
							if (isMousedown) {
								if (isHorizontal) {
									rect.height += (evt.pageY - startPos.y) * (target === 'top' ? 1 : -1);
									startPos.y = evt.pageY;
									targetLayout.height(rect.height);
								}
								else {
									rect.width += (evt.pageX - startPos.x) * (target === 'left' ? 1 : -1);
									startPos.x = evt.pageX;
									targetLayout.width(rect.width);
								}
								console.log(rect);
							}
						};
						var mouseupHandle = function (evt) {
							console.log('mouseup');
							isMousedown = false;
							$(document).off('mousemove', mousemoveHandle);
							$(document).off('mouseup', mouseupHandle);
						};
						var isMousedown = false;

						scope.direction = attrs.direction;
						scope.mousedownHandle = function (evt) {
							console.log('mousedonw');
							isMousedown = true;
							startPos = {
								x: evt.pageX,
								y: evt.pageY
							};
							targetLayout = $(element)[target === 'top' || target === 'left' ? 'prev' : 'next']();
							if (isHorizontal) {
								rect.height = targetLayout.height();
							}
							else {
								rect.width = targetLayout.width();
							}
							$(document).on('mousemove', mousemoveHandle);
							$(document).on('mouseup', mouseupHandle);
						};
					}
				};
			}
		);
	}
);