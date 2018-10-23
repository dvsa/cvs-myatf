import DataService from '../services/data';
import HistoryData from '../models/historyData';
import SessionService from '../services/sessionService';
import GetBalanceCategory from '../helpers/balanceCategoryHelper';

import RecentAccountActivityAdapter from '../adapters/recentAccountActivityAdapter';

const dataService = new DataService();

export default function (permissionsService, req, res) {
	const account = SessionService.GetAccount(req);
	const atf = SessionService.GetAtf(req);

	// Set permissions manually if one of the user roles were clicked,
	// fallback to using authenticated username from req.user
	// TODO: Remove when we stop using roles demo, instead just use authenticated username
	if (req.session.setUser) {
		permissionsService.setPermissions(req.session.setUser);
	} else {
		permissionsService.setPermissions(req.user);
	}

	dataService.getRecentAccountActivityDetails(10, 0, {}, RecentAccountActivityAdapter.Process)
		.then((result) => {
			const { hasPermissions } = permissionsService;
			const historyData = new HistoryData({}, result);
			const summaryViewVars = {
				...historyData,
				showBalance: hasPermissions('balance.full,balance.viewOnly'),
				showHistory: hasPermissions('testHistory.full,testHistory.viewOnly'),
				showBookedTests: hasPermissions('booked.full,booked.viewOnly'),
				showTopup: hasPermissions('topup.full'),
				showCancelBooking: hasPermissions('booked.full'),
				showChangeSite: hasPermissions('multisite.full'),
				balance: account.currentBalance,
				balanceCategory: GetBalanceCategory(account.currentBalance),
				balanceHealthy: account.isBalanceHealthy(),
				balanceRunningLow: account.isBalanceRunningLow(),
				balanceCritical: account.isBalanceCritical(),
				account,
				atf,
				formattedCurrentBalance: account.currentBalance.toLocaleString(),
				formattedDailySpent: account.dailySpent.toLocaleString()
			};
			res.render('prototype/account-summary', summaryViewVars);
		});
}
