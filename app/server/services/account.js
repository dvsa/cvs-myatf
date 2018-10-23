import ConfigService from './configService';

const assert = require('assert');

// Currently set default daily spend to 572 to match designs.
const defaultDailySpent = 572;

export default class Account {
	constructor(currentBalance) {
		this.currentBalance = currentBalance;
		this.dailySpent = defaultDailySpent;
		this.lastTopup = null;

		// These levels will eventually be generated using an algorithm based
		// on account history
		assert(
			ConfigService.GetAccountBalanceRunningLowLevel() >= ConfigService.GetAccountBalanceCriticalLevel(),
			'Account balance alert levels set up incorrectly - check config'
		);
	}

	addToCurrentBalance(amount) {
		this.currentBalance += amount;
	}

	isBalanceHealthy() {
		return this.currentBalance > ConfigService.GetAccountBalanceRunningLowLevel();
	}

	isBalanceRunningLow() {
		return (
			this.currentBalance > ConfigService.GetAccountBalanceCriticalLevel() &&
			this.currentBalance <= ConfigService.GetAccountBalanceRunningLowLevel()
		);
	}

	isBalanceCritical() {
		return this.currentBalance <= ConfigService.GetAccountBalanceCriticalLevel();
	}

}
