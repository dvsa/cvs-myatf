'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _expressPaginate = require('express-paginate');

var _expressPaginate2 = _interopRequireDefault(_expressPaginate);

var _paginationData = require('../models/paginationData');

var _paginationData2 = _interopRequireDefault(_paginationData);

var _configService = require('../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { paginationLinkCount } = _configService2.default.GetPaginationSettings();

class PaginationDataService {
	constructor() {
		this.generate = (req, totalResults, searchResults) => {
			const resultsPerPage = req.query.limit;
			const pageCount = this.getPageCount(totalResults, resultsPerPage);
			const pages = this.getPages(req, pageCount);
			const pageNum = req.query.page;
			const showingResultsStartIndex = this.getShowingResultsStartIndex(pageNum, resultsPerPage);
			const showingResultsEndIndex = this.getShowingResultsEndIndex(pageNum, resultsPerPage, pageCount, totalResults);
			const paginationData = new _paginationData2.default({
				searchResults,
				totalResults,
				pageCount,
				resultsPerPage,
				pageNum,
				showingResultsStartIndex,
				showingResultsEndIndex,
				pages
			});
			return paginationData;
		};

		this.getShowingResultsEndIndex = (pageNum, resultsPerPage, pageCount, totalResults) => {
			return pageCount === pageNum ? totalResults : pageNum * resultsPerPage;
		};

		this.getShowingResultsStartIndex = (pageNum, resultsPerPage) => {
			return (pageNum - 1) * resultsPerPage + 1;
		};

		this.getPages = (req, pageCount) => {
			return _expressPaginate2.default.getArrayPages(req)(paginationLinkCount, pageCount, req.query.page);
		};

		this.getPageCount = (totalResults, limit) => {
			return Math.ceil(totalResults / limit);
		};
	}

}
exports.default = PaginationDataService;
module.exports = exports['default'];