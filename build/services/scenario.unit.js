'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _scenario = require('./scenario');

var _scenario2 = _interopRequireDefault(_scenario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('scenario service', () => {

	describe('getInitialScenario', () => {
		const scenarioJson = '[{"id": 1, "currentBalance": 950, "dailySpent": 250, "lastTopup": 0},' + '{"id": 2, "currentBalance": 1000, "workingBalance": 1000, "dailySpent": 0, "lastTopup": 0}]';
		const emptyScenarioJson = '[]';
		const scenario = new _scenario2.default();
		scenario.setScenarios(JSON.parse(scenarioJson));
		const emptyScenario = new _scenario2.default(JSON.parse(emptyScenarioJson));
		emptyScenario.setScenarios(JSON.parse(emptyScenarioJson));

		describe('when scenarios are available', () => {
			it('should return the first scenario', done => {
				const initialScenario = scenario.getInitialScenario();
				(0, _expect2.default)(initialScenario.currentBalance).toBe(950);
				(0, _expect2.default)(initialScenario.dailySpent).toBe(250);
				(0, _expect2.default)(initialScenario.lastTopup).toBe(0);
				done();
			});
		});
		describe('when scenarios are empty', () => {
			it('should return scenario with all values zero', done => {
				const initialScenario = emptyScenario.getInitialScenario();
				(0, _expect2.default)(initialScenario.currentBalance).toBe(0);
				(0, _expect2.default)(initialScenario.dailySpent).toBe(0);
				(0, _expect2.default)(initialScenario.lastTopup).toBe(0);
				done();
			});
		});
	});

	describe('getScenario', () => {
		const scenarioJson = '[{"id": 1, "currentBalance": 950, "dailySpent": 250, "lastTopup": 0},' + '{"id": 2, "currentBalance": 1000, "dailySpent": 0, "lastTopup": 1000}]';
		const scenario = new _scenario2.default();
		scenario.setScenarios(JSON.parse(scenarioJson));

		describe('when get scenario by id that exists', () => {
			it('should return the correct  scenario', done => {
				const initialScenario = scenario.getScenario(2);
				(0, _expect2.default)(initialScenario.currentBalance).toBe(1000);
				(0, _expect2.default)(initialScenario.dailySpent).toBe(0);
				(0, _expect2.default)(initialScenario.lastTopup).toBe(1000);
				done();
			});
		});
		describe('when get scenario by id that does not exist', () => {
			it('should return scenario with all values zero', done => {
				const initialScenario = scenario.getScenario(20);
				(0, _expect2.default)(initialScenario.currentBalance).toBe(0);
				(0, _expect2.default)(initialScenario.dailySpent).toBe(0);
				(0, _expect2.default)(initialScenario.lastTopup).toBe(0);
				done();
			});
		});
	});
});