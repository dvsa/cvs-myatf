import SessionService from '../services/sessionService';
import Account from '../services/account';

export default (scenarioService, urlRoot, req, res) => {
	const scenario = scenarioService.getScenario(Number(req.params.scenario));
	const account = new Account(scenario.currentBalance);

	account.dailySpent = scenario.dailySpent;
	SessionService.SaveAccount(req, account);
	SessionService.SaveAtf(req, scenario.atf);
	res.redirect(`${urlRoot}prototype/account-summary`);
};
