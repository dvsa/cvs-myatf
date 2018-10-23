import { Router } from 'express';
import path from 'path';
import { check, oneOf } from 'express-validator/check';
import pagination from 'express-paginate';

import ConfigService from './services/configService';
import AuthService from './services/auth';
import PermissionsService from './services/userPermissions';
import ScenarioService from './services/scenario';
import SessionService from './services/sessionService';
import Account from './services/account';
import matchRoutes from './middleware/matchRoutes';
import urlClean from './middleware/urlClean';
import breadcrumbs from './middleware/breadcrumbs';
import atfDetails from './middleware/atfDetails';
import feedbackMailto from './middleware/feedbackMailto';
import getAccountSummary from './controllers/accountSummaryController';
import setAccountNumber from './controllers/atfAccountController';
import { getAccountHistory, postAccountHistory } from './controllers/accountHistoryController';
import { getTopupForm, postTopupForm } from './controllers/topupFormController';
import { getMultiSiteUser, postMultiSiteUser } from './controllers/multiSiteUserController';
import getTestDetails from './controllers/testDetailsController';
import getPaymentReceiptDetails from './controllers/paymentReceiptDetailsController';
import getTopupSuccess from './controllers/topupSuccessController';
import getPermissions from './controllers/permissionsController';
import getScenario from './controllers/scenarioController';
import getSearchResultsDownloadFile from './controllers/searchResultsDownloadController';
import { downloadDetail, downloadSummary } from './controllers/accountHistoryDownloadController';

export default class AppRouter {

	constructor() {
		this.scenarioService = new ScenarioService();
		this.authService = new AuthService();
		this.permissionsService = new PermissionsService();
		this.routes = Router();
	}

	setupScenarios() {
		this.scenarioService.loadScenarios();
	}

	paginationSettings = ConfigService.GetPaginationSettings();
	urlRoot = ConfigService.GetUrlRoot();

	init() {
		this.setupRoutingMiddleware();
		this.setGetHandlers();
		this.setPostHandlers();
		this.setupCatchallGetHandler();
		this.setupPostToGetRedirect();
		this.setupErrorHandler();
	}

	setGetHandlers() {
		// Clear all data in session if you open /prototype-admin/clear-data
		this.routes.get('/prototype-admin/clear-data', (req, res) => {
			SessionService.ClearData(req);
			res.render('prototype-admin/clear-data');
		});

		// Send a Robots.txt file
		this.routes.get('/robots.txt', (req, res) => {
			res.type('text/plain');
			res.send('User-agent: *\nDisallow: /');
		});

		// Route index page
		this.routes.get('/', (req, res) => {
			res.render('index');
		});

		// Route index page
		this.routes.get('/prototype', (req, res) => {
			res.render('prototype/index');
		});

		// Route multisite page
		this.routes.get(
			'/prototype/multi-site-user',
			pagination.middleware(this.paginationSettings.limit, this.paginationSettings.maxLimit),
			getMultiSiteUser
		);

		// Route Account Summary page
		this.routes.get('/prototype/account-summary', (req, res) => {
			getAccountSummary(this.permissionsService, req, res);
		});

		this.routes.get('/prototype/topup', (req, res) => {
			getTopupForm(req, res);
		});

		// Route topup success
		this.routes.get('/prototype/topup-success', getTopupSuccess);

		// Route Test History page
		this.routes.get(
			'/prototype/account-history',
			pagination.middleware(this.paginationSettings.limit, this.paginationSettings.maxLimit),
			getAccountHistory
		);

		// Route Test History Drilldown page
		this.routes.get('/prototype/test-details', getTestDetails);

		this.routes.get('/prototype/payment-receipt', getPaymentReceiptDetails);
		this.routes.get('/prototype/scenario/:scenario', (req, res) => {
			getScenario(this.scenarioService, this.urlRoot, req, res);
		});

		this.routes.get('/prototype/permissions/:user', (req, res) => {
			getPermissions(this.permissionsService, this.urlRoot, req, res);
		});
		this.routes.get('/prototype/download', getSearchResultsDownloadFile);

		this.routes.get('/prototype/download-detail', downloadDetail);

		this.routes.get('/prototype/download-summary', downloadSummary);

		this.routes.get('/prototype/set-account/:accountNumber', setAccountNumber);
	}

	setPostHandlers() {
		// Route login page
		this.routes.post(
			'/prototype/login',
			(req, res, next) => {
				this.authService.authenticate(req, res, next, (/* user */) => {
					// TODO look up real account details for user
					const scenario = this.scenarioService.getInitialScenario();
					const account = new Account(scenario.currentBalance);
					const { atf } = scenario;
					account.dailySpent = scenario.dailySpent;
					SessionService.SaveAccount(req, account);
					SessionService.SaveAtf(req, atf);
				});
			}
		);

		// Top up form submission
		this.routes.post(
			'/prototype/topup',
			oneOf([
				check('topup-amount', 'Enter a number more than 0 for your top up amount')
					.custom((value) => { return value > 0; }),
				check('last-topup', ' ')
					.custom((value) => { return value > 0; })
			], 'Top up amount should be a number'),
			postTopupForm
		);

		this.routes.post(
			'/prototype/multi-site-user',
			pagination.middleware(this.paginationSettings.limit, this.paginationSettings.maxLimit),
			postMultiSiteUser
		);

		this.routes.post(
			'/prototype/account-history',
			// need to add express-validation
			pagination.middleware(this.paginationSettings.limit, this.paginationSettings.maxLimit),
			postAccountHistory
		);
	}

	setupRoutingMiddleware() {
		// Add auth guard
		this.routes.use(this.authService.logInIfNeeded);
		// Strip .html and .htm if provided
		this.routes.get(/\.html?$/i, (req, res) => {
			let reqPath = req.path;
			const parts = path.split('.');
			parts.pop();
			reqPath = parts.join('.');
			res.redirect(reqPath);
		});

		this.routes.use(urlClean);
		// Add breadcrumbs where needed
		this.routes.use(breadcrumbs);
		// Pass atfName where needed
		this.routes.use(atfDetails);
		// Pass feedback mailto address
		this.routes.use(feedbackMailto);
	}

	setupCatchallGetHandler() {

		// Auto render any view that exists
		// App folder routes get priority
		this.routes.get(/^\/([^.]+)$/, (req, res) => {
			matchRoutes(req, res);
		});

	}

	setupPostToGetRedirect() {

		// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
		this.routes.post(/^\/([^.]+)$/, (req, res) => {
			res.redirect(this.urlRoot + req.params[0]);
		});

	}

	setupErrorHandler() {
		// error handler
		/* FROM EXPRESS DOCS:-
		Error-handling middleware always takes four arguments.
		You must provide four arguments to identify it as an error-handling middleware function.
		Even if you don’t need to use the next object, you must specify it to maintain the signature.
		Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors. */
		this.routes.use((err, req, res, next) => { // eslint-disable-line
			// TODO: look at why we need to do this to get error callstack
			console.log(err);
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};
			// render the error page
			res.status(err.status || 500);
			res.render('error');
		});
	}

}
