define(['app'], function (app) {
	app.factory('BaseModel', [ '$http', '$rootScope', function ($http, $rootScope) {
		var Model = function Model(config) {
			this.config = config || {};
			this.initMethodsByConfig(this.config);
		};

		Model.prototype = {
			excute: function (config, callback, errorCallback, oCtx) {
				var that = this,
				    _onError = errorCallback || this.errorHandle.bind(this);

			    $rootScope.showLoading = true;
				$http(config).success(function (response) {
					response.info = that.getInfoWithString(response.info);

					if (response.status) {
						callback && callback.call(oCtx, response.data, response);
					} else {
						_onError(that.getInfoWithString(response.info), status);
					}
					$rootScope.showLoading = false;
				}).error(errorCallback ? function (data, status) {
					errorCallback(that.getErrorMsg(data, status), status);
					$rootScope.showLoading = false;
				} : this.errorHandle.bind(this));
			},
			getList: function (params, callback, errorCallback, oCtx) {
				this.excute({
					method: 'get',
					url: this.builderUrl(this.config.getList, params),
					data: params
				}, callback, errorCallback, oCtx);
			},
			createOrUpdate: function (params, callback, errorCallback, oCtx) {
				this.excute({
					method: 'post',
					url: this.config.createOrUpdate,
					data: params
				}, callback, errorCallback, oCtx);
			},
			create: function (params, callback, errorCallback, oCtx) {
				this.excute({
					method: 'post',
					url: this.config.create,
					data: params
				}, callback, errorCallback, oCtx);
			},
			update: function (params, callback, errorCallback, oCtx) {
				this.excute({
					method: 'post',
					url: this.builderUrl(this.config.update, params),
					data: params
				}, callback, errorCallback, oCtx);
			},
			remove: function (params, callback, errorCallback, oCtx) {
				this.excute({
					method: 'post',
					url: this.config.remove,
					data: params
				}, callback, errorCallback, oCtx);
			},
			errorHandle: function (data, status, headers, config) {
				app.showPopup(this.getErrorMsg(data, status, headers, config));
				$rootScope.showLoading = false;
			},
			getErrorMsg: function (data, status, headers, config) {
				var errorMsg = 'status: ' + status + '\n';

				errorMsg += angular.isObject(data) ? JSON.stringify(data, null, 4) : data;

				return errorMsg
			},
			getInfoWithString: function (info) {
				var msg = '';

				if (angular.isObject(info) ) {
					for (var key in info) {
						msg += info[key] + ';'
					}
					msg = msg.substring(0, msg.length - 1);
				} else {
					msg = info;
				}

				return msg;
			},
			builderUrl: function (url, params) {
				var hasParamReg = /{.*}/i,
				    key = '';

				if (hasParamReg.test(url)) {
					for (key in params) {
						url = url.replace(new RegExp('{' + key + '}', 'gi'), params[key]);
						if (!hasParamReg.test(url)) {
							break;
						}
					}
				}

				return url;
			},
			initMethodsByConfig: function (config) {
				var that = this,
				    key = '',
			    	value = '';

				for (key in config) {
					value = config[key];

					if (angular.isObject(value)) {
						this[key] = function (value) {
							return function (params, callback, errorCallback, oCtx) {
								that.excute({
									method: (value.method || 'get'),
									url: this.builderUrl(value.url, params),
									data: params
								}, callback, errorCallback, oCtx);
							};
						}(value);
					}
				}
			} 
		};

		return Model;
	}]);
});