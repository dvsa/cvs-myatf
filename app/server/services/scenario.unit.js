import expect from 'expect';
import ScenarioService from './scenario';

describe('scenario service', () => {

	describe('getInitialScenario', () => {
		const scenarioJson = '[{"id": 1, "currentBalance": 950, "dailySpent": 250, "lastTopup": 0},'
		+ '{"id": 2, "currentBalance": 1000, "workingBalance": 1000, "dailySpent": 0, "lastTopup": 0}]';
		const emptyScenarioJson = '[]';
		const scenario = new ScenarioService();
		scenario.setScenarios(JSON.parse(scenarioJson));
		const emptyScenario = new ScenarioService(JSON.parse(emptyScenarioJson));
		emptyScenario.setScenarios(JSON.parse(emptyScenarioJson));

		describe('when scenarios are available', () => {
			it('should return the first scenario', (done) => {
				const initialScenario = scenario.getInitialScenario();
				expect(initialScenario.currentBalance).toBe(950);
				expect(initialScenario.dailySpent).toBe(250);
				expect(initialScenario.lastTopup).toBe(0);
				done();
			});
		});
		describe('when scenarios are empty', () => {
			it('should return scenario with all values zero', (done) => {
				const initialScenario = emptyScenario.getInitialScenario();
				expect(initialScenario.currentBalance).toBe(0);
				expect(initialScenario.dailySpent).toBe(0);
				expect(initialScenario.lastTopup).toBe(0);
				done();
			});
		});
	});

	describe('getScenario', () => {
		const scenarioJson = '[{"id": 1, "currentBalance": 950, "dailySpent": 250, "lastTopup": 0},'
		+ '{"id": 2, "currentBalance": 1000, "dailySpent": 0, "lastTopup": 1000}]';
		const scenario = new ScenarioService();
		scenario.setScenarios(JSON.parse(scenarioJson));

		describe('when get scenario by id that exists', () => {
			it('should return the correct  scenario', (done) => {
				const initialScenario = scenario.getScenario(2);
				expect(initialScenario.currentBalance).toBe(1000);
				expect(initialScenario.dailySpent).toBe(0);
				expect(initialScenario.lastTopup).toBe(1000);
				done();
			});
		});
		describe('when get scenario by id that does not exist', () => {
			it('should return scenario with all values zero', (done) => {
				const initialScenario = scenario.getScenario(20);
				expect(initialScenario.currentBalance).toBe(0);
				expect(initialScenario.dailySpent).toBe(0);
				expect(initialScenario.lastTopup).toBe(0);
				done();
			});
		});
	});
});
