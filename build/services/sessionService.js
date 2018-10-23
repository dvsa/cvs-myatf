'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _account = require('../services/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionService {
	static ClearData(req) {
		req.session = null;
	}

	static GetAccount(req) {
		if (typeof req.session.account === 'undefined') {
			const newAccount = new _account2.default(0);
			newAccount.dailySpent = 0;
			req.session.account = JSON.stringify(newAccount);
		}

		return Object.assign(new _account2.default(), JSON.parse(req.session.account));
	}

	static SaveAccount(req, account) {
		req.session.account = JSON.stringify(account);
	}

	static SaveAtf(req, atf) {
		req.session.atf = JSON.stringify(atf);
	}
	static GetAtf(req) {
		if (typeof req.session.atf === 'undefined') {
			const newAtf = {};
			req.session.atf = JSON.stringify(newAtf);
		}

		return Object.assign({}, JSON.parse(req.session.atf));
	}
}
exports.default = SessionService;
module.exports = exports['default'];