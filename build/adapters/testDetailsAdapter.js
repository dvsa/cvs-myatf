'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _gridDefinition = require('../models/gridDefinition');

var _gridDefinition2 = _interopRequireDefault(_gridDefinition);

var _gridHeading = require('../models/gridHeading');

var _gridHeading2 = _interopRequireDefault(_gridHeading);

var _gridRowItem = require('../models/gridRowItem');

var _gridRowItem2 = _interopRequireDefault(_gridRowItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestDetailsAdapter {}
exports.default = TestDetailsAdapter;

TestDetailsAdapter.formatCurrency = val => {
	let retVal = '';
	if (val) {
		retVal = `£${val.toLocaleString()}`;
	}
	return retVal;
};

TestDetailsAdapter.Process = searchResults => {
	const headings = [new _gridHeading2.default('Activity', 'bold'), new _gridHeading2.default('Start and end time', 'bold'), new _gridHeading2.default('Fee', 'bold numeric'), new _gridHeading2.default('VAT', 'bold numeric '), new _gridHeading2.default('Total fees', 'bold numeric'), new _gridHeading2.default('Details', 'bold')];

	const rows = searchResults.map(val => {
		let classes = '';
		if (val.startEndTime === '') {
			classes = 'bold';
		}
		return [new _gridRowItem2.default(val.activity, classes), new _gridRowItem2.default(val.startEndTime), new _gridRowItem2.default(TestDetailsAdapter.formatCurrency(val.fee), 'numeric'), new _gridRowItem2.default(TestDetailsAdapter.formatCurrency(val.vat), 'numeric'), new _gridRowItem2.default(TestDetailsAdapter.formatCurrency(val.totalFees), 'numeric'), val.details === 'Download certificate' ? new _gridRowItem2.default(val.details, '', '#') : new _gridRowItem2.default(val.details)];
	});

	return new _gridDefinition2.default(headings, rows);
};

module.exports = exports['default'];