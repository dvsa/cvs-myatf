// setup environment variables with dotenv first
require('dotenv').config();
const config = require('./../config');

export default class ConfigService {
	static IsRunningLocally() {
		return (process.env.RUNNINGLOCALLY || config.runningLocally).toLowerCase() === 'true';
	}

	static GetExpectedUsername() {
		return process.env.USERNAME;
	}

	static GetExpectedPassword() {
		return process.env.PASSWORD;
	}

	static GetSessionSecret() {
		return process.env.APPSECRET || console.error('Please set the environment variable: APPSECRET');
	}

	static GetEnv() {
		return (process.env.NODE_ENV || 'development').toLowerCase();
	}

	static GetPort() {
		return Number(process.env.PORT || config.port);
	}

	static UseAuth() {
		return (process.env.USE_AUTH || config.useAuth).toLowerCase() === 'true';
	}

	static AutoStoreData() {
		return (process.env.USE_AUTO_STORE_DATA || config.useAutoStoreData) === 'true';
	}

	static UseHttps() {
		return (process.env.USE_HTTPS || config.useHttps).toLowerCase() === 'true';
	}

	static GetAssets() {
		return process.env.ASSETS || config.assets;
	}

	static GetUrlRoot() {
		return process.env.URLROOT || config.urlRoot;
	}

	static GetAnalyticsId() {
		return process.env.ANALYTICS_TRACKING_ID;
	}

	static GetCookieText() {
		return config.cookieText;
	}

	static GetServiceName() {
		return config.serviceName;
	}

	static GetPaginationSettings() {
		return config.pagination;
	}

	static GetHistorySearchFormData() {
		return config.historySearchForm;
	}

	static GetAccountBalanceRunningLowLevel() {
		return Number(config.accountBalanceRunningLowLevel);
	}

	static GetAccountBalanceCriticalLevel() {
		return Number(config.accountBalanceCriticalLevel);
	}

	static GetFeedbackMailto() {
		return config.feedbackMailto;
	}

	static GetDefaultNumDaysHistory() {
		return config.defaultNumDaysHistory;
	}
}

