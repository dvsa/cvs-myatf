import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';
import ConfigService from './../services/configService';

export default class Auth {

	urlRoot = ConfigService.GetUrlRoot();

	authenticate = (req, res, next, userLoggedInCallback) => {
		passport.authenticate('local', (err, user) => {
			if (err) return next(err);
			if (!user) {
				return res.render('prototype/login', {
					loginAuthenticationError: 'true'
				});
			}
			return req.logIn(user, (err2) => {
				if (err2) { return next(err2); }
				userLoggedInCallback(user);
				return res.redirect(`${this.urlRoot}prototype/account-summary`);
			});
		})(req, res, next, userLoggedInCallback);
	}

	logInIfNeeded = (req, res, next) => {
		if (Auth.urlExcludedFromLogin(req.originalUrl)) {
			next();
		} else if (!ConfigService.UseAuth()) {
			// Do nothing if auth bypassed (dev mode)
			next();
		} else {
			const loginPage = `${this.urlRoot}prototype/login`;
			ensureLoggedIn(loginPage)(req, res, next);
		}
	}

	static urlExcludedFromLogin(url) {
		// We don't have urlRoot here - this is intentional as
		// urlRoot has been stripped off at this point
		const loginUrl = '/prototype/login';
		const entryUrl = '/';

		return (
			url === loginUrl ||
			url === entryUrl);
	}

}

