import URL from 'url';

// Add the breadcrumbs if we have data for it
export default (req, res, next) => {
	const urlString = new URL.parse(req.originalUrl.toString());
	const page = urlString.pathname;

	if (pageHasBreadcrumbs(page)) {
		res.locals.breadcrumbs = getBreadcrumbs(page);
	}

	next();
};

// Just keep adding to this as you add pages that need breadcrumbs
const breadcrumbs = {
	'/prototype/account-summary': [
		{ name: 'Account Summary', url: '/prototype/account-summary' }
	],
	'/prototype/account-history': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Account History', url: '/prototype/account-history' }
	],
	'/prototype/account-history/chassis-number': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Account History', url: '/prototype/account-history/chassis-number' },
	],
	'/prototype/account-history/registration-number': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Account History', url: '/prototype/account-history/registration-number' },
	],
	'/prototype/test-details': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Account History', url: '/prototype/account-history' },
		{ name: 'Test Details', url: '/prototype/test-details' },
	],
	'/prototype/topup': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Topup Account', url: '/prototype/topup' }
	],
	'/prototype/topup-success': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Topup Account', url: '/prototype/topup' },
		{ name: 'Topup Success', url: '/prototype/topup-success' }
	],
	'/prototype/topup-failure': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Topup Account', url: '/prototype/topup' },
		{ name: 'Topup Failure', url: '/prototype/topup-failure' }
	],
	'/prototype/topup-summary': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Topup Account', url: '/prototype/topup' },
		{ name: 'Topup Summary', url: '/prototype/topup-summary' },
	],
	'/prototype/payment-receipt': [
		{ name: 'Account Summary', url: '/prototype/account-summary' },
		{ name: 'Your Account History', url: '/prototype/account-history' },
		{ name: 'Payment Receipt', url: '/prototype/payment-receipt' },
	],
};

function pageHasBreadcrumbs(page) {
	return page in breadcrumbs;
}

function getBreadcrumbs(page) {
	return breadcrumbs[page];
}
