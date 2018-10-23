import DataService from '../services/data';
import TestDetailsAdapter from '../adapters/testDetailsAdapter';
import HealthAndSafetyDetailsAdapter from '../adapters/healthAndSafetyDetailsAdapter';

const dataService = new DataService();

const searchError = (error) => {
	throw error;
};

export default (req, res) => {
	dataService.getTestHistoryDrilldown(11, 1, {}, TestDetailsAdapter.Process)
		.then((historyDetailsResult) => {

			dataService.getHealthAndSafetyDetails(DataService.AllRecords(), 0, {}, HealthAndSafetyDetailsAdapter.Process)
				.then((healthAndSafetyResult) => {

					const data = {
						transactionData: {
							Headings: historyDetailsResult.Headings,
							Results: historyDetailsResult.Results,
							TotalResults: historyDetailsResult.TotalResults
						},
						healthAndSafetyData: {
							Headings: healthAndSafetyResult.Headings,
							Results: healthAndSafetyResult.Results,
							TotalResults: healthAndSafetyResult.TotalResults
						}
					};

					res.render('prototype/test-details', data);
				})
				.catch(searchError);
		})
		.catch(searchError);
};
