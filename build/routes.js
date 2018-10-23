'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _check = require('express-validator/check');

var _expressPaginate = require('express-paginate');

var _expressPaginate2 = _interopRequireDefault(_expressPaginate);

var _configService = require('./services/configService');

var _configService2 = _interopRequireDefault(_configService);

var _auth = require('./services/auth');

var _auth2 = _interopRequireDefault(_auth);

var _userPermissions = require('./services/userPermissions');

var _userPermissions2 = _interopRequireDefault(_userPermissions);

var _scenario = require('./services/scenario');

var _scenario2 = _interopRequireDefault(_scenario);

var _sessionService = require('./services/sessionService');

var _sessionService2 = _interopRequireDefault(_sessionService);

var _account = require('./services/account');

var _account2 = _interopRequireDefault(_account);

var _matchRoutes = require('./middleware/matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _urlClean = require('./middleware/urlClean');

var _urlClean2 = _interopRequireDefault(_urlClean);

var _breadcrumbs = require('./middleware/breadcrumbs');

var _breadcrumbs2 = _interopRequireDefault(_breadcrumbs);

var _atfDetails = require('./middleware/atfDetails');

var _atfDetails2 = _interopRequireDefault(_atfDetails);

var _feedbackMailto = require('./middleware/feedbackMailto');

var _feedbackMailto2 = _interopRequireDefault(_feedbackMailto);

var _accountSummaryController = require('./controllers/accountSummaryController');

var _accountSummaryController2 = _interopRequireDefault(_accountSummaryController);

var _atfAccountController = require('./controllers/atfAccountController');

var _atfAccountController2 = _interopRequireDefault(_atfAccountController);

var _accountHistoryController = require('./controllers/accountHistoryController');

var _topupFormController = require('./controllers/topupFormController');

var _multiSiteUserController = require('./controllers/multiSiteUserController');

var _testDetailsController = require('./controllers/testDetailsController');

var _testDetailsController2 = _interopRequireDefault(_testDetailsController);

var _paymentReceiptDetailsController = require('./controllers/paymentReceiptDetailsController');

var _paymentReceiptDetailsController2 = _interopRequireDefault(_paymentReceiptDetailsController);

var _topupSuccessController = require('./controllers/topupSuccessController');

var _topupSuccessController2 = _interopRequireDefault(_topupSuccessController);

var _permissionsController = require('./controllers/permissionsController');

var _permissionsController2 = _interopRequireDefault(_permissionsController);

var _scenarioController = require('./controllers/scenarioController');

var _scenarioController2 = _interopRequireDefault(_scenarioController);

var _searchResultsDownloadController = require('./controllers/searchResultsDownloadController');

var _searchResultsDownloadController2 = _interopRequireDefault(_searchResultsDownloadController);

var _accountHistoryDownloadController = require('./controllers/accountHistoryDownloadController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppRouter {

	constructor() {
		this.paginationSettings = _configService2.default.GetPaginationSettings();
		this.urlRoot = _configService2.default.GetUrlRoot();

		this.scenarioService = new _scenario2.default();
		this.authService = new _auth2.default();
		this.permissionsService = new _userPermissions2.default();
		this.routes = (0, _express.Router)();
	}

	setupScenarios() {
		this.scenarioService.loadScenarios();
	}

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
			_sessionService2.default.ClearData(req);
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
		this.routes.get('/prototype/multi-site-user', _expressPaginate2.default.middleware(this.paginationSettings.limit, this.paginationSettings.maxLimit), _multiSiteUserController.getMultiSiteUser);

		// Route Account Summary page
		this.routes.get('/prototype/account-summary', (req, res) => {
			(0, _accountSummaryController2.default)(this.permissionsService, req, res);
		});

		this.routes.get('/prototype/topup', (req, res) => {
			(0, _topupFormController.getTopupForm)(req, res);
		});

		// Route topup success
		this.routes.get('/prototype/topup-success', _topupSuccessController2.default);

		// Route Test History page
		this.routes.get('/prototype/account-history', _expressPaginate2.default.middleware(this.paginationSettings.limit, this.paginationSettings.maxLimit), _accountHistoryController.getAccountHistory);

		// Route Test History Drilldown page
		this.routes.get('/prototype/test-details', _testDetailsController2.default);

		this.routes.get('/prototype/payment-receipt', _paymentReceiptDetailsController2.default);
		this.routes.get('/prototype/scenario/:scenario', (req, res) => {
			(0, _scenarioController2.default)(this.scenarioService, this.urlRoot, req, res);
		});

		this.routes.get('/prototype/permissions/:user', (req, res) => {
			(0, _permissionsController2.default)(this.permissionsService, this.urlRoot, req, res);
		});
		this.routes.get('/prototype/download', _searchResultsDownloadController2.default);

		this.routes.get('/prototype/download-detail', _accountHistoryDownloadController.downloadDetail);

		this.routes.get('/prototype/download-summary', _accountHistoryDownloadController.downloadSummary);

		this.routes.get('/prototype/set-account/:accountNumber', _atfAccountController2.default);
	}

	setPostHandlers() {
		// Route login page
		this.routes.post('/prototype/login', (req, res, next) => {
			this.authService.authenticate(req, res, next, () => /* user */{
				// TODO look up real account details for user
				const scenario = this.scenarioService.getInitialScenario();
				const account = new _account2.default(scenario.currentBalance);
				const { atf } = scenario;
				account.dailySpent = scenario.dailySpent;
				_sessionService2.default.SaveAccount(req, account);
				_sessionService2.default.SaveAtf(req, atf);
			});
		});

		// Top up form submission
		this.routes.post('/prototype/topup', (0, _check.oneOf)([(0, _check.check)('topup-amount', 'Enter a number more than 0 for your top up amount').custom(value => {
			return value > 0;
		}), (0, _check.check)('last-topup', ' ').custom(value => {
			return value > 0;
		})], 'Top up amount should be a number'), _topupFormController.postTopupForm);

		this.routes.post('/prototype/multi-site-user', _expressPaginate2.default.middleware(this.paginationSettings.limit, this.paginationSettings.maxLimit), _multiSiteUserController.postMultiSiteUser);

		this.routes.post('/prototype/account-history',
		// need to add express-validation
		_expressPaginate2.default.middleware(this.paginationSettings.limit, this.paginationSettings.maxLimit), _accountHistoryController.postAccountHistory);
	}

	setupRoutingMiddleware() {
		// Add auth guard
		this.routes.use(this.authService.logInIfNeeded);
		// Strip .html and .htm if provided
		this.routes.get(/\.html?$/i, (req, res) => {
			let reqPath = req.path;
			const parts = _path2.default.split('.');
			parts.pop();
			reqPath = parts.join('.');
			res.redirect(reqPath);
		});

		this.routes.use(_urlClean2.default);
		// Add breadcrumbs where needed
		this.routes.use(_breadcrumbs2.default);
		// Pass atfName where needed
		this.routes.use(_atfDetails2.default);
		// Pass feedback mailto address
		this.routes.use(_feedbackMailto2.default);
	}

	setupCatchallGetHandler() {

		// Auto render any view that exists
		// App folder routes get priority
		this.routes.get(/^\/([^.]+)$/, (req, res) => {
			(0, _matchRoutes2.default)(req, res);
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
		this.routes.use((err, req, res, next) => {
			// eslint-disable-line
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
exports.default = AppRouter;
module.exports = exports['default'];