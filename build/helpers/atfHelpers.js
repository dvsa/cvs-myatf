'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _data = require('../services/data');

var _data2 = _interopRequireDefault(_data);

var _configService = require('../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataService = new _data2.default();

exports.default = (accountNumber, req, res, callback) => {
	dataService.getAtfDetails(_configService2.default.GetPaginationSettings().maxLimit, 0, {}, data => {
		return { data };
	}).then(data => {
		const SearchResults = data;
		SearchResults.data.forEach(atfSite => {
			if (atfSite.AtfAccountNumber === accountNumber) {
				callback(atfSite);
			}
		});
	});
};

module.exports = exports['default'];