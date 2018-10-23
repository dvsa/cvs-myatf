'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (date) {
	if (date) {
		const dateStr = date.split('/');
		return {
			day: dateStr[0],
			month: dateStr[1],
			year: dateStr[2]
		};
	}
	return undefined;
};

module.exports = exports['default'];