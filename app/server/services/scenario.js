import loadFromFileAndParse from './../helpers/loadFromFileAndParse';
import loadFromUrlAndParse from './../helpers/loadFromUrlAndParse';
import ConfigService from './../services/configService';

export default class Scenario {
    isLoaded = false;
	runningLocally = ConfigService.IsRunningLocally();
	assets = ConfigService.GetAssets();

	scenarios = [];

	loadScenarios = () => {
		const loadFile = this.runningLocally ? loadFromFileAndParse : loadFromUrlAndParse;
		const file = this.runningLocally ? 'public/mock-data/scenarios.json' : `${this.assets}public/mock-data/scenarios.json`;
		loadFile(file)
			.then(this.parseJson)
			.catch(this.loadScenariosError);
	}

	loadScenariosError = (err) => {
		const errMsg = `Error loading scenarios:  + ${err}`;
		console.error(errMsg);
		throw err;
	}

	parseJson = (jsonObjects) => {
		const scenarios = [];
		jsonObjects.forEach((element) => {
			const scenario = {};
			scenario.id = Number(element.id);
			scenario.currentBalance = Number(element.currentBalance);
			scenario.dailySpent = Number(element.dailySpent);
			scenario.atf = 	element.atf;
			scenarios.push(scenario);
		});

		this.setScenarios(scenarios);
		this.isLoaded = true;
	}

	setScenarios = (scenarios) => {
		this.scenarios = scenarios;
	}

	getInitialScenario() {
		if (!this.isLoaded) {
			this.loadScenarios();
		}

		if (this.scenarios.length > 0) {
			return (this.scenarios[0]);
		}

		return ({
			currentBalance: 0,
			dailySpent: 0,
			lastTopup: 0,
			atf: {
				atfAccountNumber: 'AccountNumber',
				atfAccountName: 'ATF Name',
				atfAddress: 'ATF Address',
				atfBalance: 0
			}
		});
	}

	getScenario(id) {
		if (!this.isLoaded) {
			this.loadScenarios();
		}
		let foundScenario = {
			currentBalance: 0,
			dailySpent: 0,
			lastTopup: 0,
			atf: {
				atfAccountNumber: 'AccountNumber',
				atfAccountName: 'ATF Name',
				atfAddress: 'ATF Address',
				atfBalance: 0
			}
		};

		this.scenarios.forEach((element) => {
			if (element.id === id) {
				foundScenario = element;
			}
		});

		return (foundScenario);
	}
}
