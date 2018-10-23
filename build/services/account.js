'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _configService = require('./configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const assert = require('assert');

// Currently set default daily spend to 572 to match designs.
const defaultDailySpent = 572;

class Account {
	constructor(currentBalance) {
		this.currentBalance = currentBalance;
		this.dailySpent = defaultDailySpent;
		this.lastTopup = null;

		// These levels will eventually be generated using an algorithm based
		// on account history
		assert(_configService2.default.GetAccountBalanceRunningLowLevel() >= _configService2.default.GetAccountBalanceCriticalLevel(), 'Account balance alert levels set up incorrectly - check config');
	}

	addToCurrentBalance(amount) {
		this.currentBalance += amount;
	}

	isBalanceHealthy() {
		return this.currentBalance > _configService2.default.GetAccountBalanceRunningLowLevel();
	}

	isBalanceRunningLow() {
		return this.currentBalance > _configService2.default.GetAccountBalanceCriticalLevel() && this.currentBalance <= _configService2.default.GetAccountBalanceRunningLowLevel();
	}

	isBalanceCritical() {
		return this.currentBalance <= _configService2.default.GetAccountBalanceCriticalLevel();
	}

}
exports.default = Account;
module.exports = exports['default'];