require.config({
    baseUrl: './js',
    paths: {
		'angular': 'lib/angular',
		'angular-route': 'lib/angular-route',
		'angular-animation': 'lib/angular-animation',
		'bootstrap': 'lib/bootstrap.min',
		'jquery': 'lib/jquery-1.11.3',
		'ZTree': '../ZTree/js/jquery.ztree.all-3.5.min',

		'BaseModel': 'Services/BaseModel'
    },
	shim: {
		'app': {
			deps: ['angular', 'angular-route', 'angular-animation', 'bootstrap']
		},
		'angular-route': {
			deps: ['angular']
		},
		'angular-animation': {
			deps: ['angular']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'ZTree': {
			deps: ['jquery']
		}
	}
});

require(['app'], function(app) {
    angular.bootstrap(document, ['app']);
});