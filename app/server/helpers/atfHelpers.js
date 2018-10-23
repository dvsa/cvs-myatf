import DataService from '../services/data';
import ConfigService from '../services/configService';

const dataService = new DataService();

export default (accountNumber, req, res, callback) => {
	dataService.getAtfDetails(ConfigService.GetPaginationSettings().maxLimit, 0, {}, (data) => {
		return { data };
	})
		.then((data) => {
			const SearchResults = data;
			SearchResults.data.forEach((atfSite) => {
				if (atfSite.AtfAccountNumber === accountNumber) {
					callback(atfSite);
				}
			});
		});
};
