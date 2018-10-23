'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.postMultiSiteUser = exports.getMultiSiteUser = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _data = require('../services/data');

var _data2 = _interopRequireDefault(_data);

var _paginationDataService = require('../services/paginationDataService');

var _paginationDataService2 = _interopRequireDefault(_paginationDataService);

var _configService = require('../services/configService');

var _configService2 = _interopRequireDefault(_configService);

var _atfAdapter = require('../adapters/atfAdapter');

var _atfAdapter2 = _interopRequireDefault(_atfAdapter);

var _manuallySetSessionData = require('../middleware/manuallySetSessionData');

var _manuallySetSessionData2 = _interopRequireDefault(_manuallySetSessionData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataService = new _data2.default();
const paginationDataService = new _paginationDataService2.default();
const paginationSettings = _configService2.default.GetPaginationSettings();

const handleError = err => {
	console.log(err);
	throw err;
};

const searchPlaceholderText = 'Search by name, account number or address..';
const searchByKeys = ['AtfAccountName', 'AtfAccountNumber', 'AtfAddress'];

const getMultiSiteUser = exports.getMultiSiteUser = (req, res) => {

	const pageLimit = typeof req.query.limit === 'undefined' ? paginationSettings.limit : req.query.limit;

	dataService.getAtfDetails(pageLimit, req.skip, {}, _atfAdapter2.default.Process).then(data => {
		const SearchResults = data.data;
		const { TotalResults } = data;
		const paginationData = paginationDataService.generate(req, TotalResults, SearchResults);
		res.render('prototype/multi-site-user', _extends({}, paginationData, paginationSettings, {
			atfSites: SearchResults,
			searchPlaceholderText
		}));
	}).catch(handleError);
};

const postMultiSiteUser = exports.postMultiSiteUser = (req, res) => {

	const pageLimit = typeof req.query.limit === 'undefined' ? paginationSettings.limit : req.query.limit;
	const searchData = {
		query: req.body,
		searchByKeys
	};

	dataService.getAtfDetails(pageLimit, req.skip, searchData, _atfAdapter2.default.Process).then(dataOb => {
		const SearchResults = dataOb.data;
		const { TotalResults } = dataOb;
		const paginationData = paginationDataService.generate(req, TotalResults, SearchResults);
		const { searchQuery } = searchData.query;
		(0, _manuallySetSessionData2.default)(req, res, 'currentMultiSiteSearchOptions', req.body);
		res.render('prototype/multi-site-user', _extends({}, paginationData, paginationSettings, {
			atfSites: SearchResults,
			searchQuery,
			searchPlaceholderText
		}));
	}).catch(handleError);
};