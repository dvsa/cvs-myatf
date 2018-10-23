'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.postAccountHistory = exports.getAccountHistory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _testHistorySearch = require('../helpers/testHistorySearch');

var _testHistorySearch2 = _interopRequireDefault(_testHistorySearch);

var _manuallySetSessionData = require('../middleware/manuallySetSessionData');

var _manuallySetSessionData2 = _interopRequireDefault(_manuallySetSessionData);

var _data = require('../services/data');

var _data2 = _interopRequireDefault(_data);

var _paginationDataService = require('../services/paginationDataService');

var _paginationDataService2 = _interopRequireDefault(_paginationDataService);

var _searchFormData = require('../models/searchFormData');

var _searchFormData2 = _interopRequireDefault(_searchFormData);

var _historyData = require('../models/historyData');

var _historyData2 = _interopRequireDefault(_historyData);

var _accountHistoryAdapter = require('../adapters/accountHistoryAdapter');

var _accountHistoryAdapter2 = _interopRequireDefault(_accountHistoryAdapter);

var _configService = require('../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let showDownload;
const paginationDataService = new _paginationDataService2.default();
const dataService = new _data2.default();
const paginationSettings = _configService2.default.GetPaginationSettings();
const { testHistorySearchTypes } = _configService2.default.GetHistorySearchFormData();

const searchError = error => {
	throw error;
};

const getAccountHistory = exports.getAccountHistory = (req, res) => {

	const searchOptions = (0, _testHistorySearch2.default)();
	const useDateFields = true;
	const showDefaultLastNumDaysText = true;
	const maxYear = new Date().getUTCFullYear;
	showDownload = true;
	const { path } = req;

	const pageLimit = typeof req.query.limit === 'undefined' ? paginationSettings.limit : req.query.limit;

	dataService.getAccountHistory(pageLimit, req.skip, {}, _accountHistoryAdapter2.default.Process).then(historyObject => {
		const { SearchResults, TotalResults } = historyObject;
		const historyData = new _historyData2.default(searchOptions, historyObject);
		historyData.showDefaultLastNumDaysText = showDefaultLastNumDaysText;
		const paginationData = paginationDataService.generate(req, TotalResults, SearchResults);
		const searchFormData = new _searchFormData2.default({
			showDownload,
			path,
			useDateFields,
			searchTypes: testHistorySearchTypes
		});
		searchFormData.maxYear = maxYear;
		res.render('prototype/account-history', _extends({}, historyData, paginationData, searchFormData, paginationSettings));
	}).catch(searchError);
};

const postAccountHistory = exports.postAccountHistory = (req, res) => {
	const searchByKeys = ['type'];
	const searchOptions = (0, _testHistorySearch2.default)(req.body);
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

	dataService.getAccountHistory(pageLimit, req.skip, searchData, _accountHistoryAdapter2.default.Process).then(historyObject => {
		const historyData = new _historyData2.default(searchOptions, historyObject);
		historyData.showDefaultLastNumDaysText = showDefaultLastNumDaysText;
		const { SearchResults, TotalResults } = historyObject;
		const paginationData = paginationDataService.generate(req, TotalResults, SearchResults);
		const searchFormData = new _searchFormData2.default({
			showDownload,
			path,
			useDateFields,
			searchTypes: testHistorySearchTypes
		});
		searchFormData.maxYear = maxYear;
		(0, _manuallySetSessionData2.default)(req, res, 'currentSearchOptions', searchOptions);
		res.render('prototype/account-history', _extends({}, historyData, paginationData, searchFormData, paginationSettings));
	}).catch(searchError);
};