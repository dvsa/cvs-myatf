'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _atfHelpers = require('../helpers/atfHelpers');

var _atfHelpers2 = _interopRequireDefault(_atfHelpers);

var _account = require('../services/account');

var _account2 = _interopRequireDefault(_account);

var _sessionService = require('../services/sessionService');

var _sessionService2 = _interopRequireDefault(_sessionService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, res) => {
	(0, _atfHelpers2.default)(req.params.accountNumber, req, res, atfSite => {
		const atf = {
			atfAccountNumber: atfSite.AtfAccountNumber,
			atfAccountName: atfSite.AtfAccountName,
			atfAddress: atfSite.AtfAddress
		};
		const account = new _account2.default(atfSite.AtfBalance);
		_sessionService2.default.SaveAccount(req, account);
		_sessionService2.default.SaveAtf(req, atf);
		res.redirect('/prototype/account-summary');
	});
};

module.exports = exports['default'];