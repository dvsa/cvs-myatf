'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (permissionsService, req, res) {
	const account = _sessionService2.default.GetAccount(req);
	const atf = _sessionService2.default.GetAtf(req);

	// Set permissions manually if one of the user roles were clicked,
	// fallback to using authenticated username from req.user
	// TODO: Remove when we stop using roles demo, instead just use authenticated username
	if (req.session.setUser) {
		permissionsService.setPermissions(req.session.setUser);
	} else {
		permissionsService.setPermissions(req.user);
	}

	dataService.getRecentAccountActivityDetails(10, 0, {}, _recentAccountActivityAdapter2.default.Process).then(result => {
		const { hasPermissions } = permissionsService;
		const historyData = new _historyData2.default({}, result);
		const summaryViewVars = _extends({}, historyData, {
			showBalance: hasPermissions('balance.full,balance.viewOnly'),
			showHistory: hasPermissions('testHistory.full,testHistory.viewOnly'),
			showBookedTests: hasPermissions('booked.full,booked.viewOnly'),
			showTopup: hasPermissions('topup.full'),
			showCancelBooking: hasPermissions('booked.full'),
			showChangeSite: hasPermissions('multisite.full'),
			balance: account.currentBalance,
			balanceCategory: (0, _balanceCategoryHelper2.default)(account.currentBalance),
			balanceHealthy: account.isBalanceHealthy(),
			balanceRunningLow: account.isBalanceRunningLow(),
			balanceCritical: account.isBalanceCritical(),
			account,
			atf,
			formattedCurrentBalance: account.currentBalance.toLocaleString(),
			formattedDailySpent: account.dailySpent.toLocaleString()
		});
		res.render('prototype/account-summary', summaryViewVars);
	});
};

var _data = require('../services/data');

var _data2 = _interopRequireDefault(_data);

var _historyData = require('../models/historyData');

var _historyData2 = _interopRequireDefault(_historyData);

var _sessionService = require('../services/sessionService');

var _sessionService2 = _interopRequireDefault(_sessionService);

var _balanceCategoryHelper = require('../helpers/balanceCategoryHelper');

var _balanceCategoryHelper2 = _interopRequireDefault(_balanceCategoryHelper);

var _recentAccountActivityAdapter = require('../adapters/recentAccountActivityAdapter');

var _recentAccountActivityAdapter2 = _interopRequireDefault(_recentAccountActivityAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataService = new _data2.default();

module.exports = exports['default'];