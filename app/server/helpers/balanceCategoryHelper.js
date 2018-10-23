import ConfigService from '../services/configService';

const accountBalanceRunningLowLevel = ConfigService.GetAccountBalanceRunningLowLevel();
const accountBalanceCriticalLevel = ConfigService.GetAccountBalanceCriticalLevel();

export default (balance) => {
	if (balance < accountBalanceCriticalLevel) return 'critical';
	if (balance < accountBalanceRunningLowLevel) return 'low';
	return 'recommended';
};
