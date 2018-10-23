'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loadFromFileAndParse = require('./../helpers/loadFromFileAndParse');

var _loadFromFileAndParse2 = _interopRequireDefault(_loadFromFileAndParse);

var _loadFromUrlAndParse = require('./../helpers/loadFromUrlAndParse');

var _loadFromUrlAndParse2 = _interopRequireDefault(_loadFromUrlAndParse);

var _configService = require('./../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Scenario {
	constructor() {
		this.isLoaded = false;
		this.runningLocally = _configService2.default.IsRunningLocally();
		this.assets = _configService2.default.GetAssets();
		this.scenarios = [];

		this.loadScenarios = () => {
			const loadFile = this.runningLocally ? _loadFromFileAndParse2.default : _loadFromUrlAndParse2.default;
			const file = this.runningLocally ? 'public/mock-data/scenarios.json' : `${this.assets}public/mock-data/scenarios.json`;
			loadFile(file).then(this.parseJson).catch(this.loadScenariosError);
		};

		this.loadScenariosError = err => {
			const errMsg = `Error loading scenarios:  + ${err}`;
			console.error(errMsg);
			throw err;
		};

		this.parseJson = jsonObjects => {
			const scenarios = [];
			jsonObjects.forEach(element => {
				const scenario = {};
				scenario.id = Number(element.id);
				scenario.currentBalance = Number(element.currentBalance);
				scenario.dailySpent = Number(element.dailySpent);
				scenario.atf = element.atf;
				scenarios.push(scenario);
			});

			this.setScenarios(scenarios);
			this.isLoaded = true;
		};

		this.setScenarios = scenarios => {
			this.scenarios = scenarios;
		};
	}

	getInitialScenario() {
		if (!this.isLoaded) {
			this.loadScenarios();
		}

		if (this.scenarios.length > 0) {
			return this.scenarios[0];
		}

		return {
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

		this.scenarios.forEach(element => {
			if (element.id === id) {
				foundScenario = element;
			}
		});

		return foundScenario;
	}
}
exports.default = Scenario;
module.exports = exports['default'];