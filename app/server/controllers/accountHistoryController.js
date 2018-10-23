import GetTestHistorySearchOptions from '../helpers/testHistorySearch';
import manuallyStoreSessionData from '../middleware/manuallySetSessionData';
import DataService from '../services/data';
import PaginationDataService from '../services/paginationDataService';
import SearchFormData from '../models/searchFormData';
import HistoryData from '../models/historyData';
import AccountHistoryAdapter from '../adapters/accountHistoryAdapter';
import ConfigService from '../services/configService';

let showDownload;
const paginationDataService = new PaginationDataService();
const dataService = new DataService();
const paginationSettings = ConfigService.GetPaginationSettings();
const { testHistorySearchTypes } = ConfigService.GetHistorySearchFormData();

const searchError = (error) => {
	throw error;
};

export const getAccountHistory = (req, res) => {

	const searchOptions = GetTestHistorySearchOptions();
	const useDateFields = true;
	const showDefaultLastNumDaysText = true;
	const maxYear = new Date().getUTCFullYear;
	showDownload = true;
	const { path } = req;

	const pageLimit = typeof req.query.limit === 'undefined' ? paginationSettings.limit : req.query.limit;

	dataService.getAccountHistory(pageLimit, req.skip, {}, AccountHistoryAdapter.Process)
		.then((historyObject) => {
			const { SearchResults, TotalResults } = historyObject;
			const historyData = new HistoryData(searchOptions, historyObject);
			historyData.showDefaultLastNumDaysText = showDefaultLastNumDaysText;
			const paginationData = paginationDataService.generate(req, TotalResults, SearchResults);
			const searchFormData = new SearchFormData({
				showDownload,
				path,
				useDateFields,
				searchTypes: testHistorySearchTypes
			});
			searchFormData.maxYear = maxYear;
			res.render('prototype/account-history', {
				...historyData,
				...paginationData,
				...searchFormData,
				...paginationSettings
			});
		})
		.catch(searchError);
};

export const postAccountHistory = (req, res) => {
	const searchByKeys = ['type'];
	const searchOptions = GetTestHistorySearchOptions(req.body);
	const { path } = req;
	const showDefaultLastNumDaysText = false;
	const useDateFields = true;
	const maxYear = new Date().getUTCFullYear;
	showDownload = true;

	let searchData = {};

	const doSearch = searchOptions.HistoryFilter !== 'All';
	if (doSearch) {
		searchData = {
			query: { searchQuery: searchOptions.HistoryFilter },
			searchByKeys
		};
	}

	const pageLimit = typeof req.query.limit === 'undefined' ? paginationSettings.limit : req.query.limit;

	dataService.getAccountHistory(pageLimit, req.skip, searchData, AccountHistoryAdapter.Process)
		.then((historyObject) => {
			const historyData = new HistoryData(searchOptions, historyObject);
			historyData.showDefaultLastNumDaysText = showDefaultLastNumDaysText;
			const { SearchResults, TotalResults } = historyObject;
			const paginationData = paginationDataService.generate(req, TotalResults, SearchResults);
			const searchFormData = new SearchFormData({
				showDownload,
				path,
				useDateFields,
				searchTypes: testHistorySearchTypes
			});
			searchFormData.maxYear = maxYear;
			manuallyStoreSessionData(req, res, 'currentSearchOptions', searchOptions);
			res.render('prototype/account-history', {
				...historyData,
				...paginationData,
				...searchFormData,
				...paginationSettings
			});
		})
		.catch(searchError);
};
