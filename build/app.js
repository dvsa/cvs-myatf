'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _forceHttps = require('./middleware/forceHttps');

var _forceHttps2 = _interopRequireDefault(_forceHttps);

var _autoStoreData = require('./middleware/autoStoreData');

var _autoStoreData2 = _interopRequireDefault(_autoStoreData);

var _nunjucksHelpers = require('./helpers/nunjucksHelpers');

var _configService = require('./services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local dependencies

// import favicon from 'serve-favicon'
// Core dependencies
const AppRouter = require('./routes');

// NPM dependencies


const LocalStrategy = _passportLocal.Strategy;

class App {

	constructor() {
		this.setupData = () => {
			this.router.setupScenarios();
		};

		this.runningLocally = _configService2.default.IsRunningLocally();
		this.expectedUsername = _configService2.default.GetExpectedUsername();
		this.expectedPassword = _configService2.default.GetExpectedPassword();
		this.sessionSecret = _configService2.default.GetSessionSecret();
		this.env = _configService2.default.GetEnv();
		this.useAutoStoreData = _configService2.default.AutoStoreData();
		this.useHttps = _configService2.default.UseHttps();
		this.assets = _configService2.default.GetAssets();
		this.urlRoot = _configService2.default.GetUrlRoot();
		this.nunjucksAppEnv = null;
		this.router = null;

		this.app = (0, _express2.default)();
		this.setupConfig();
		this.setupTemplating();
		this.setupMiddleware();
		this.setupAuth();
		this.setupStaticAssets();
		this.setupRouter();
	}
	// Not used yet - analyticsId = ConfigService.GetAnalyticsId();


	setupConfig() {
		// Add variables that are available in all views
		this.app.locals.analyticsId = this.analyticsId;
		this.app.locals.asset_path = this.runningLocally ? '/public/' : `${this.assets}govuk_modules/govuk_template/assets/`;
		this.app.locals.toolkit_asset_path = this.runningLocally ? '/public/' : `${this.assets}govuk_modules/govuk_frontend_toolkit/`;
		this.app.locals.useAutoStoreData = this.useAutoStoreData;
		this.app.locals.cookieText = _configService2.default.GetCookieText();
		this.app.locals.releaseVersion = `v${this.releaseVersion}`;
		this.app.locals.serviceName = _configService2.default.GetServiceName();
		this.app.locals.runningLocally = this.runningLocally;
		this.app.locals.assets = this.assets;
		this.app.locals.urlRoot = this.urlRoot;
	}

	setupTemplating() {

		const appViews = [_path2.default.join(__dirname, '/views/')];
		this.nunjucksAppEnv = _nunjucks2.default.configure(appViews, {
			autoescape: true,
			express: this.app,
			noCache: true,
			watch: true
		});
		// Add Nunjucks filters
		(0, _nunjucksHelpers.addNunjucksFilters)(this.nunjucksAppEnv);
		// Set views engine
		this.app.set('view engine', 'html');
	}

	setupStaticAssets() {

		// Middleware to serve static assets
		const assetBasePath = this.runningLocally ? `${process.cwd()}/` : this.assets;

		this.app.use('/public', _express2.default.static(_path2.default.join(assetBasePath, 'public')));
		this.app.use('/public', _express2.default.static(_path2.default.join(assetBasePath, 'govuk_modules/govuk_template/assets')));
		this.app.use('/public', _express2.default.static(_path2.default.join(assetBasePath, 'govuk_modules/govuk_frontend_toolkit')));
		this.app.use('/public/images/icons', _express2.default.static(_path2.default.join(assetBasePath, 'govuk_modules/govuk_frontend_toolkit/images')));
		this.app.use('/govuk_modules', _express2.default.static(_path2.default.join(assetBasePath, 'govuk_modules')));
	}

	setupMiddleware() {
		// Gzip compressing
		this.app.use((0, _compression2.default)());
		// Enable CORS
		this.app.use((0, _cors2.default)());
		// Add best practice security headers
		this.app.use((0, _helmet2.default)());
		// Force HTTPS on production. Do this before using basicAuth to avoid
		// asking for username/password twice (for `http`, then `https`).
		const isSecure = this.env === 'production' && this.useHttps;
		if (isSecure) {
			this.app.use(_forceHttps2.default);
			this.app.set('trust proxy', 1); // needed for secure cookies on heroku
		}
		// Elements refers to icon folder instead of images folder
		// this.app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images', 'favicon.ico')))
		// Support for parsing data in POSTs
		this.app.use(_bodyParser2.default.json());
		this.app.use(_bodyParser2.default.urlencoded({
			extended: true
		}));
		// Support session data
		this.app.use((0, _cookieSession2.default)({
			maxAge: 1000 * 60 * 60 * 4, // 4 hours
			secure: isSecure,
			name: 'atf-account-view-prototype',
			secret: this.sessionSecret
		}));
		// Automatically store all data users enter
		if (this.useAutoStoreData) {
			this.app.use(_autoStoreData2.default);
			(0, _nunjucksHelpers.addCheckedFunction)(this.nunjucksAppEnv);
		}
		// Prevent search indexing
		this.app.use((req, res, next) => {
			// Setting headers stops pages being indexed even if indexed pages link to them.
			res.setHeader('X-Robots-Tag', 'noindex');
			next();
		});
	}

	setupAuth() {
		// TODO, replace these with user id lookups
		_passport2.default.serializeUser((username, done) => {
			done(null, username);
		});

		_passport2.default.deserializeUser((username, done) => {
			done(null, username);
		});

		this.app.use(_passport2.default.initialize());
		this.app.use(_passport2.default.session());

		// Passport for authentication
		_passport2.default.use(new LocalStrategy({
			usernameField: 'user-id',
			passwordField: 'password'
		}, (username, password, done) => {
			if (username === this.expectedUsername && password === this.expectedPassword) {
				return done(null, username);
			}

			return done(null, false, { message: 'Incorrect username or password.' });
		}));
	}

	setupRouter() {
		this.router = new AppRouter();
		this.router.init();
		this.app.use('/', this.router.routes);
	}
}
exports.default = App;
module.exports = exports['default'];