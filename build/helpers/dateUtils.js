"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
class DateUtils {

	static getDayOfMonth(date) {
		return date.getUTCDate();
	}

	static getMonth(date) {
		return date.getUTCMonth() + 1;
	}

	static getFullYear(date) {
		return date.getUTCFullYear();
	}

}
exports.default = DateUtils;
module.exports = exports["default"];