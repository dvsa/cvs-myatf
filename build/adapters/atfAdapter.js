'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _balanceCategoryHelper = require('../helpers/balanceCategoryHelper');

var _balanceCategoryHelper2 = _interopRequireDefault(_balanceCategoryHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AtfAdapter {}
exports.default = AtfAdapter;

AtfAdapter.Process = searchResults => {
	const rows = searchResults.map(val => {
		return {
			atfAccountNumber: val.AtfAccountNumber,
			atfAccountName: val.AtfAccountName,
			atfAddress: val.AtfAddress,
			atfBalance: val.AtfBalance,
			atfBalanceString: val.AtfBalance.toLocaleString(),
			atfBalanceCategory: (0, _balanceCategoryHelper2.default)(val.AtfBalance)
		};
	});
	return { data: rows };
};

module.exports = exports['default'];