define(['app'], function (app) {
	app.directive('pagination', function() {
		var getPages = function (data) {
	        	var showPageCount = data.maxPageCount || 10,
	        	    currentPage = data.currentPage || 1,
	        	    pageCount = data.pageCount,
	        	    prePageCnt = Math.ceil(showPageCount / 2) - showPageCount % 2,
	        	    delt = pageCount - showPageCount,
	        	    start = 1,
	        	    end = pageCount,
	        	    pages = [];

	        	if (delt > 0) {
	        		if (currentPage > prePageCnt) {
	        			start = currentPage - prePageCnt;
	        		}
	        	}

	        	end = start + showPageCount - 1;

	        	if (end > pageCount) {
	        		start -= end - pageCount;
	        		start = Math.max(1, start);
	        		end = pageCount;
	        	}

	        	while (start <= end) {
	        		pages.push(start++);
	        	}

	        	return pages;
	        },
	        link = function (scope, element, attrs) {
	        	var changePage = function (page) {
	        		scope.pageInfo.currentPage = page;
	        		scope.pageInfo.pages = getPages(scope.pageInfo);
	        		scope.onChange && scope.onChange() && scope.onChange()(page);
	        	};

	        	angular.extend(scope.pageInfo, {
	        		maxPageCount: +attrs.maxPageCount || 10,
	        		prePage: scope.pageInfo.currentPage
	        	});

	        	scope.pageInfo.pages = getPages(scope.pageInfo);

	        	angular.extend(scope, {
	        		onSelectPage: function (page) {
	        			if (scope.pageInfo.currentPage !== page) {
	        				changePage(page);
	        			}
	        		},
	        		onPrePage: function (page) {
	        			if (page >= 1) {
	        				changePage(page);
	        			}
	        		},
	        		onNextPage: function (page) {
	        			if (page <= scope.pageInfo.pageCount) {
	        				changePage(page);
	        			}
	        		}
	        	});
			};

	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            pageInfo: '=info',
	            onChange: '&'
	        },
	        templateUrl: './js/directives/pagination.html',
	        link: link
	    };
	});
});
