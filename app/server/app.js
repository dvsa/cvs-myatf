// Core dependencies
import path from 'path';

// NPM dependencies
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
// import favicon from 'serve-favicon'
import nunjucks from 'nunjucks';
import session from 'cookie-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import forceHttps from './middleware/forceHttps';
import autoStoreData from './middleware/autoStoreData';
import { addNunjucksFilters, addCheckedFunction } from './helpers/nunjucksHelpers';
import ConfigService from './services/configService';
// Local dependencies
const AppRouter = require('./routes');

const LocalStrategy = Strategy;

export default class App {

	constructor() {
		this.app = express();
		this.setupConfig();
		this.setupTemplating();
		this.setupMiddleware();
		this.setupAuth();
		this.setupStaticAssets();
		this.setupRouter();
	}

	setupData = () => {
		this.router.setupScenarios();
	}

	runningLocally = ConfigService.IsRunningLocally();
	expectedUsername = ConfigService.GetExpectedUsername();
	expectedPassword = ConfigService.GetExpectedPassword();
	sessionSecret = ConfigService.GetSessionSecret();
	env = ConfigService.GetEnv();
	useAutoStoreData = ConfigService.AutoStoreData();
	useHttps = ConfigService.UseHttps();
	// Not used yet - analyticsId = ConfigService.GetAnalyticsId();
	assets = ConfigService.GetAssets();
	urlRoot = ConfigService.GetUrlRoot();
	nunjucksAppEnv = null;
	router = null;

	setupConfig() {
		// Add variables that are available in all views
		this.app.locals.analyticsId = this.analyticsId;
		this.app.locals.asset_path = (this.runningLocally) ? '/public/' : `${this.assets}govuk_modules/govuk_template/assets/`;
		this.app.locals.toolkit_asset_path = (this.runningLocally) ? '/public/' : `${this.assets}govuk_modules/govuk_frontend_toolkit/`;
		this.app.locals.useAutoStoreData = (this.useAutoStoreData);
		this.app.locals.cookieText = ConfigService.GetCookieText();
		this.app.locals.releaseVersion = `v${this.releaseVersion}`;
		this.app.locals.serviceName = ConfigService.GetServiceName();
		this.app.locals.runningLocally = this.runningLocally;
		this.app.locals.assets = this.assets;
		this.app.locals.urlRoot = this.urlRoot;
	}

	setupTemplating() {

		const appViews = [path.join(__dirname, '/views/')];
		this.nunjucksAppEnv = nunjucks.configure(appViews, {
			autoescape: true,
			express: this.app,
			noCache: true,
			watch: true,
		});
		// Add Nunjucks filters
		addNunjucksFilters(this.nunjucksAppEnv);
		// Set views engine
		this.app.set('view engine', 'html');

	}

	setupStaticAssets() {

		// Middleware to serve static assets
		const assetBasePath = (this.runningLocally) ? `${process.cwd()}/` : this.assets;

		this.app.use('/public', express.static(path.join(assetBasePath, 'public')));
		this.app.use('/public', express.static(path.join(assetBasePath, 'govuk_modules/govuk_template/assets')));
		this.app.use('/public', express.static(path.join(assetBasePath, 'govuk_modules/govuk_frontend_toolkit')));
		this.app.use('/public/images/icons', express.static(path.join(assetBasePath, 'govuk_modules/govuk_frontend_toolkit/images')));
		this.app.use('/govuk_modules', express.static(path.join(assetBasePath, 'govuk_modules')));
	}

	setupMiddleware() {
		// Gzip compressing
		this.app.use(compression());
		// Enable CORS
		this.app.use(cors());
		// Add best practice security headers
		this.app.use(helmet());
		// Force HTTPS on production. Do this before using basicAuth to avoid
		// asking for username/password twice (for `http`, then `https`).
		const isSecure = (this.env === 'production' && this.useHttps);
		if (isSecure) {
			this.app.use(forceHttps);
			this.app.set('trust proxy', 1); // needed for secure cookies on heroku
		}
		// Elements refers to icon folder instead of images folder
		// this.app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images', 'favicon.ico')))
		// Support for parsing data in POSTs
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true,
		}));
		// Support session data
		this.app.use(session({
			maxAge: 1000 * 60 * 60 * 4, // 4 hours
			secure: isSecure,
			name: 'atf-account-view-prototype',
			secret: this.sessionSecret
		}));
		// Automatically store all data users enter
		if (this.useAutoStoreData) {
			this.app.use(autoStoreData);
			addCheckedFunction(this.nunjucksAppEnv);
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
		passport.serializeUser((username, done) => {
			done(null, username);
		});

		passport.deserializeUser((username, done) => {
			done(null, username);
		});

		this.app.use(passport.initialize());
		this.app.use(passport.session());

		// Passport for authentication
		passport.use(new LocalStrategy(
			{
				usernameField: 'user-id',
				passwordField: 'password'
			},
			(username, password, done) => {
				if (username === this.expectedUsername && password === this.expectedPassword) {
					return done(null, username);
				}

				return done(null, false, { message: 'Incorrect username or password.' });
			}
		));
	}

	setupRouter() {
		this.router = new AppRouter();
		this.router.init();
		this.app.use('/', this.router.routes);
	}
}
