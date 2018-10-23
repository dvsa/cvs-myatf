"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
class SearchFormData {

	constructor(data) {
		const {
			showDownload,
			path,
			searchTypes,
			useDateFields,
			inputData
		} = data;
		this.path = path;
		this.showDownload = showDownload;
		this.useDateFields = useDateFields;
		this.searchTypes = searchTypes;
		this.inputData = inputData || null;
	}

}
exports.default = SearchFormData;
module.exports = exports["default"];