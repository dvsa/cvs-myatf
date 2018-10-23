'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _configService = require('../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accountBalanceRunningLowLevel = _configService2.default.GetAccountBalanceRunningLowLevel();
const accountBalanceCriticalLevel = _configService2.default.GetAccountBalanceCriticalLevel();

exports.default = balance => {
	if (balance < accountBalanceCriticalLevel) return 'critical';
	if (balance < accountBalanceRunningLowLevel) return 'low';
	return 'recommended';
};

module.exports = exports['default'];