'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _data = require('../services/data');

var _data2 = _interopRequireDefault(_data);

var _testDetailsAdapter = require('../adapters/testDetailsAdapter');

var _testDetailsAdapter2 = _interopRequireDefault(_testDetailsAdapter);

var _healthAndSafetyDetailsAdapter = require('../adapters/healthAndSafetyDetailsAdapter');

var _healthAndSafetyDetailsAdapter2 = _interopRequireDefault(_healthAndSafetyDetailsAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataService = new _data2.default();

const searchError = error => {
	throw error;
};

exports.default = (req, res) => {
	dataService.getTestHistoryDrilldown(11, 1, {}, _testDetailsAdapter2.default.Process).then(historyDetailsResult => {

		dataService.getHealthAndSafetyDetails(_data2.default.AllRecords(), 0, {}, _healthAndSafetyDetailsAdapter2.default.Process).then(healthAndSafetyResult => {

			const data = {
				transactionData: {
					Headings: historyDetailsResult.Headings,
					Results: historyDetailsResult.Results,
					TotalResults: historyDetailsResult.TotalResults
				},
				healthAndSafetyData: {
					Headings: healthAndSafetyResult.Headings,
					Results: healthAndSafetyResult.Results,
					TotalResults: healthAndSafetyResult.TotalResults
				}
			};

			res.render('prototype/test-details', data);
		}).catch(searchError);
	}).catch(searchError);
};

module.exports = exports['default'];