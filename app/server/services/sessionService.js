import Account from '../services/account';

export default class SessionService {
	static ClearData(req) {
		req.session = null;
	}

	static GetAccount(req) {
		if (typeof req.session.account === 'undefined') {
			const newAccount = new Account(0);
			newAccount.dailySpent = 0;
			req.session.account = JSON.stringify(newAccount);
		}

		return Object.assign(new Account(), JSON.parse(req.session.account));
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
