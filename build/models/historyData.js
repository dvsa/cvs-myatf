"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = class {

	constructor(searchData, searchResults) {
		this.SearchData = searchData;
		this.GridData = {
			Headings: searchResults.Headings,
			Results: searchResults.Results,
			TotalResults: searchResults.TotalResults
		};
	}

};
module.exports = exports["default"];