import DataService from '../services/data';
import PaginationDataService from '../services/paginationDataService';
import ConfigService from '../services/configService';
import AtfAdapter from '../adapters/atfAdapter';

import manuallyStoreSessionData from '../middleware/manuallySetSessionData';

const dataService = new DataService();
const paginationDataService = new PaginationDataService();
const paginationSettings = ConfigService.GetPaginationSettings();

const handleError = (err) => {
	console.log(err);
	throw err;
};

const searchPlaceholderText = 'Search by name, account number or address..';
const searchByKeys = ['AtfAccountName', 'AtfAccountNumber', 'AtfAddress'];

export const getMultiSiteUser = (req, res) => {

	const pageLimit = typeof req.query.limit === 'undefined' ? paginationSettings.limit : req.query.limit;

	dataService.getAtfDetails(pageLimit, req.skip, {}, AtfAdapter.Process)
		.then((data) => {
			const SearchResults = data.data;
			const { TotalResults } = data;
			const paginationData = paginationDataService.generate(req, TotalResults, SearchResults);
			res.render('prototype/multi-site-user', {
				...paginationData,
				...paginationSettings,
				atfSites: SearchResults,
				searchPlaceholderText
			});
		})
		.catch(handleError);
};

export const postMultiSiteUser = (req, res) => {

	const pageLimit = typeof req.query.limit === 'undefined' ? paginationSettings.limit : req.query.limit;
	const searchData = {
		query: req.body,
		searchByKeys
	};

	dataService.getAtfDetails(pageLimit, req.skip, searchData, AtfAdapter.Process)
		.then((dataOb) => {
			const SearchResults = dataOb.data;
			const { TotalResults } = dataOb;
			const paginationData = paginationDataService.generate(req, TotalResults, SearchResults);
			const { searchQuery } = searchData.query;
			manuallyStoreSessionData(req, res, 'currentMultiSiteSearchOptions', req.body);
			res.render('prototype/multi-site-user', {
				...paginationData,
				...paginationSettings,
				atfSites: SearchResults,
				searchQuery,
				searchPlaceholderText
			});
		})
		.catch(handleError);

};
