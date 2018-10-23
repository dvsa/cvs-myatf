'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _connectEnsureLogin = require('connect-ensure-login');

var _configService = require('./../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Auth {
	constructor() {
		this.urlRoot = _configService2.default.GetUrlRoot();

		this.authenticate = (req, res, next, userLoggedInCallback) => {
			_passport2.default.authenticate('local', (err, user) => {
				if (err) return next(err);
				if (!user) {
					return res.render('prototype/login', {
						loginAuthenticationError: 'true'
					});
				}
				return req.logIn(user, err2 => {
					if (err2) {
						return next(err2);
					}
					userLoggedInCallback(user);
					return res.redirect(`${this.urlRoot}prototype/account-summary`);
				});
			})(req, res, next, userLoggedInCallback);
		};

		this.logInIfNeeded = (req, res, next) => {
			if (Auth.urlExcludedFromLogin(req.originalUrl)) {
				next();
			} else if (!_configService2.default.UseAuth()) {
				// Do nothing if auth bypassed (dev mode)
				next();
			} else {
				const loginPage = `${this.urlRoot}prototype/login`;
				(0, _connectEnsureLogin.ensureLoggedIn)(loginPage)(req, res, next);
			}
		};
	}

	static urlExcludedFromLogin(url) {
		// We don't have urlRoot here - this is intentional as
		// urlRoot has been stripped off at this point
		const loginUrl = '/prototype/login';
		const entryUrl = '/';

		return url === loginUrl || url === entryUrl;
	}

}
exports.default = Auth;
module.exports = exports['default'];