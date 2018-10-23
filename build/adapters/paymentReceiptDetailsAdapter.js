'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _gridDefinition = require('../models/gridDefinition');

var _gridDefinition2 = _interopRequireDefault(_gridDefinition);

var _gridRowItem = require('../models/gridRowItem');

var _gridRowItem2 = _interopRequireDefault(_gridRowItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentReceiptDetailsAdapter {}
exports.default = PaymentReceiptDetailsAdapter;

PaymentReceiptDetailsAdapter.Process = searchResults => {
	const headings = [];
	const rows = searchResults.map(val => {
		let classes = '';
		if (val.recordValue === '') {
			classes = 'bold heading-large';
		}

		return [new _gridRowItem2.default(val.recordName, classes), new _gridRowItem2.default(val.recordValue)];
	});

	return new _gridDefinition2.default(headings, rows);
};

module.exports = exports['default'];