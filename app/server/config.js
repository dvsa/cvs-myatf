// Use this file to change prototype configuration.

// Note: prototype config can be overridden using environment variables (eg on heroku)

module.exports = {
	// Service name used in header. Eg: 'Renew your passport'
	serviceName: 'Manage your Authorised Testing Facility',

	// Default port that prototype runs on
	port: '3000',

	// Enable or disable password protection on production
	useAuth: 'true',

	// Automatically stores form data, and send to all views
	useAutoStoreData: 'true',

	// Enable or disable built-in docs and examples.
	useDocumentation: 'true',

	// Force HTTP to redirect to HTTPS on production
	useHttps: 'true',

	// Cookie warning - update link to service's cookie page.
	cookieText: 'GOV.UK uses cookies to make the site simpler. <a href="#">Find out more about cookies</a>',

	// Is the app running locally or not
	runningLocally: 'false',

	// Url of the assets
	assets: '/',

	// Base url the app is hosted
	urlRoot: '/',

	// Pagination settings
	pagination: {
		limit: 10,
		maxLimit: 250,
		paginationLinkCount: 5
	},

	// Data for the search form appearing on the test & transaction history screens
	historySearchForm: {
		testHistorySearchTypes: [
			{ text: 'All test history', href: '/prototype/test-history' },
			{ text: 'Registration number', href: '/prototype/test-history/registration-number' },
			{ text: 'Chassis number', href: '/prototype/test-history/chassis-number' }
		]
	},

	// For dev purposes, the account balance level that triggers balance running low alerts
	accountBalanceRunningLowLevel: 3000,

	// For dev purposes, the account balance level that triggers balance critical alerts
	accountBalanceCriticalLevel: 500,

	// TODO: Add a real email address here when it has been provided
	feedbackMailto: 'fakefeedbackemail@fakeemails.com',

	// Default number of days in past to show data for in account history
	defaultNumDaysHistory: 7
};
