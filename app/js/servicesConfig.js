define([], function () {
	return {
		INDEX: {
			'getList': '/index/getList'
		},
		API: {
			'getList': '/api/getList',
			'getDetail': {
				method: 'get',
				url: '/api/{id}'
			}
		},
		DATA: {
			'getList': '/data/dlist'
		},
		CASE: {
			'getList': '/case/clist'
		},
		MODULE: {
			'getList': '/module/modules'
		},
		PLAN: {
			'getList': '/plan/plist'
		}

	};
});