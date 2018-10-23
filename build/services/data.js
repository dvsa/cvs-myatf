'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _loadFromFileAndParse = require('../helpers/loadFromFileAndParse');

var _loadFromFileAndParse2 = _interopRequireDefault(_loadFromFileAndParse);

var _loadFromUrlAndParse = require('../helpers/loadFromUrlAndParse');

var _loadFromUrlAndParse2 = _interopRequireDefault(_loadFromUrlAndParse);

var _configService = require('./configService');

var _configService2 = _interopRequireDefault(_configService);

var _simpleSearchService = require('../services/simpleSearchService');

var _simpleSearchService2 = _interopRequireDefault(_simpleSearchService);

var _getURI = require('../helpers/getURI');

var _getURI2 = _interopRequireDefault(_getURI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Data {
	constructor() {
		this.runningLocally = _configService2.default.IsRunningLocally();
		this.assets = _configService2.default.GetAssets();
		this.loadFilePromise = this.runningLocally ? _loadFromFileAndParse2.default : _loadFromUrlAndParse2.default;

		this.getPagedObject = (historyJson, numOfRecords, recordsToSkip) => {
			const startIndex = recordsToSkip;

			return historyJson.slice(startIndex, startIndex + numOfRecords);
		};

		this.getDataObject = (filename, numOfRecords, recordsToSkip, searchData, adapterCallback) => {

			return this.loadFilePromise((0, _getURI2.default)(filename)).then(data => {
				if (Object.keys(searchData).length > 0 && searchData.query.searchQuery) {
					// Search Logic to go here
					const { query, searchByKeys } = searchData;
					const searchResults = _simpleSearchService2.default.search(query.searchQuery, data, searchByKeys);
					const tableData = adapterCallback(this.getPagedObject(searchResults, numOfRecords, recordsToSkip));
					return _extends({}, tableData, {
						TotalResults: searchResults.length
					});
				}
				const tableData = adapterCallback(this.getPagedObject(data, numOfRecords, recordsToSkip));
				return _extends({}, tableData, {
					TotalResults: data.length
				});
			}).catch(this.getHistoryObjError);
		};

		this.getTestHistoryDrilldown = (numOfRecords, pageNum, searchData, adapterCallback) => {
			return this.getDataObject('test-details.json', numOfRecords, pageNum, searchData, adapterCallback);
		};

		this.getAtfDetails = (numOfRecords, recordsToSkip, searchData, adapterCallback) => {
			return this.getDataObject('atf-details.json', numOfRecords, recordsToSkip, searchData, adapterCallback);
		};

		this.getPaymentReceiptDetails = (numOfRecords, pageNum, searchData, adapterCallback) => {
			return this.getDataObject('payment-receipt.json', numOfRecords, pageNum, searchData, adapterCallback);
		};

		this.getHealthAndSafetyDetails = (numOfRecords, pageNum, searchData, adapterCallback) => {
			return this.getDataObject('health-and-safety-details.json', numOfRecords, pageNum, searchData, adapterCallback);
		};

		this.getRecentAccountActivityDetails = (numOfRecords, pageNum, searchData, adapterCallback) => {
			return this.getDataObject('recent-account-activity.json', numOfRecords, pageNum, searchData, adapterCallback);
		};

		this.getAccountHistory = (numOfRecords, pageNum, searchData, adapterCallback) => {
			return this.getDataObject('account-history.json', numOfRecords, pageNum, searchData, adapterCallback);
		};

		this.getHistoryObjError = err => {
			throw err;
		};
	}

}
exports.default = Data;

Data.AllRecords = () => {
	return Number.MAX_SAFE_INTEGER;
};

module.exports = exports['default'];