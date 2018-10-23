"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
class SearchService {
	// Searches provided array returning the items that include the query in the provided keys
	static search(query, array, keys) {
		const lowQuery = query.toLowerCase();
		return array.filter(item => {
			return keys.some(key => item[key].toLowerCase().includes(lowQuery));
		});
	}

}
exports.default = SearchService;
module.exports = exports["default"];