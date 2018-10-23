'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sessionData) {

	const today = new Date();
	const dateToCompare = new Date();
	dateToCompare.setDate(today.getUTCDate() - _configService2.default.GetDefaultNumDaysHistory());
	let startDate = {
		day: _dateUtils2.default.getDayOfMonth(dateToCompare),
		month: _dateUtils2.default.getMonth(dateToCompare),
		year: _dateUtils2.default.getFullYear(dateToCompare)
	};
	let endDate = {
		day: _dateUtils2.default.getDayOfMonth(today),
		month: _dateUtils2.default.getMonth(today),
		year: _dateUtils2.default.getFullYear(today)
	};
	let historyFilter = 'All';

	if (typeof sessionData !== 'undefined') {
		const selectedStartDate = sessionData['date-picker-0'];
		const selectedEndDate = sessionData['date-picker-1'];
		historyFilter = sessionData['radio-account-history'];

		startDate = (0, _dateSplitter2.default)(selectedStartDate);
		endDate = (0, _dateSplitter2.default)(selectedEndDate);

		if (typeof startDate === 'undefined') {
			startDate = {
				day: sessionData['date-day-from'],
				month: sessionData['date-month-from'],
				year: sessionData['date-year-from']
			};
		}
		if (typeof endDate === 'undefined') {
			endDate = {
				day: sessionData['date-day-to'],
				month: sessionData['date-month-to'],
				year: sessionData['date-year-to']
			};
		}
	}

	const options = {
		StartDate: startDate,
		EndDate: endDate,
		HistoryFilter: historyFilter
	};

	return options;
};

var _dateSplitter = require('./dateSplitter');

var _dateSplitter2 = _interopRequireDefault(_dateSplitter);

var _dateUtils = require('./dateUtils');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _configService = require('../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];