"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = class {

	constructor(data) {
		const {
			searchResults,
			totalResults,
			pageCount,
			resultsPerPage,
			pageNum,
			showingResultsStartIndex,
			showingResultsEndIndex,
			pages
		} = data;
		this.searchResults = searchResults;
		this.totalResults = totalResults;
		this.pageCount = pageCount;
		this.resultsPerPage = resultsPerPage;
		this.pageNum = pageNum;
		this.showingResultsEndIndex = showingResultsEndIndex;
		this.showingResultsStartIndex = showingResultsStartIndex;
		this.pages = pages;
	}

};
module.exports = exports["default"];