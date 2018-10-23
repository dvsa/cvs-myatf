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

class AccountHistoryAdapter {}
exports.default = AccountHistoryAdapter;

AccountHistoryAdapter.Process = searchResults => {
	const headings = [new _gridHeading2.default('Date', 'bold'), new _gridHeading2.default('Invoice / Receipt', 'bold'), new _gridHeading2.default('Amount', 'bold numeric'), new _gridHeading2.default('Vat', 'bold numeric'), new _gridHeading2.default('Total', 'bold numeric')];

	const rows = searchResults.map(val => {
		const total = val.amount - val.vat;
		return [new _gridRowItem2.default(val.date), new _gridRowItem2.default(AccountHistoryAdapter.toFurtherDetailsString(val.type, val.document_id), '', AccountHistoryAdapter.toFurtherDetailsUrl(val.type) // TODO can pass ID to generate correct URL here
		), new _gridRowItem2.default(AccountHistoryAdapter.toPlusMinusCurrency(val.amount), 'numeric'), new _gridRowItem2.default(AccountHistoryAdapter.toCurrency(val.vat), 'numeric'), new _gridRowItem2.default(AccountHistoryAdapter.toPlusMinusCurrency(total), 'numeric')];
	});

	return new _gridDefinition2.default(headings, rows);
};

AccountHistoryAdapter.toPlusMinusCurrency = amount => {
	const formattedAmount = AccountHistoryAdapter.toCurrency(amount);

	return amount < 0 ? `-${formattedAmount}` : `+${formattedAmount}`;
};

AccountHistoryAdapter.toCurrency = amount => {
	return `£${Math.abs(amount).toFixed(2).toLocaleString()}`;
};

AccountHistoryAdapter.toFurtherDetailsString = (type, id) => {
	if (type === 'testing') {
		return `Vehicle testing - ${id}`;
	}

	if (type === 'top-up') {
		return `Account top up - ${id}`;
	}

	throw new Error(`Unknown type "${type}" in account history data`);
};

AccountHistoryAdapter.toFurtherDetailsUrl = type => {
	if (type === 'testing') {
		return '/prototype/test-details';
	}

	if (type === 'top-up') {
		return '/prototype/payment-receipt';
	}

	throw new Error(`Unknown type "${type}" in account history data`);
};

module.exports = exports['default'];