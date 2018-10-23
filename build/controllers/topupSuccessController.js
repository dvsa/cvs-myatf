'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sessionService = require('../services/sessionService');

var _sessionService2 = _interopRequireDefault(_sessionService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, res) => {
	const account = _sessionService2.default.GetAccount(req);

	const topupAmount = Number(req.session.data['topup-amount']) || 0;
	account.addToCurrentBalance(topupAmount);
	account.lastTopup = topupAmount;
	_sessionService2.default.SaveAccount(req, account);

	res.render('prototype/topup-success', {
		account
	});
};

module.exports = exports['default'];