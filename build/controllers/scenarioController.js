'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sessionService = require('../services/sessionService');

var _sessionService2 = _interopRequireDefault(_sessionService);

var _account = require('../services/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (scenarioService, urlRoot, req, res) => {
	const scenario = scenarioService.getScenario(Number(req.params.scenario));
	const account = new _account2.default(scenario.currentBalance);

	account.dailySpent = scenario.dailySpent;
	_sessionService2.default.SaveAccount(req, account);
	_sessionService2.default.SaveAtf(req, scenario.atf);
	res.redirect(`${urlRoot}prototype/account-summary`);
};

module.exports = exports['default'];