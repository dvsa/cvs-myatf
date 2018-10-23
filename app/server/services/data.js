import loadFromFileAndParse from '../helpers/loadFromFileAndParse';
import loadFromUrlAndParse from '../helpers/loadFromUrlAndParse';
import ConfigService from './configService';
import SearchService from '../services/simpleSearchService';
import getUri from '../helpers/getURI';

export default class Data {
	runningLocally = ConfigService.IsRunningLocally();
	assets = ConfigService.GetAssets();
	loadFilePromise = this.runningLocally ? loadFromFileAndParse : loadFromUrlAndParse;

	getPagedObject = (historyJson, numOfRecords, recordsToSkip) => {
		const startIndex = recordsToSkip;

		return historyJson.slice(startIndex, startIndex + numOfRecords);
	}

	getDataObject = (filename, numOfRecords, recordsToSkip, searchData, adapterCallback) => {

		return this.loadFilePromise(getUri(filename))
			.then((data) => {
				if (Object.keys(searchData).length > 0 && searchData.query.searchQuery) {
					// Search Logic to go here
					const { query, searchByKeys } = searchData;
					const searchResults = SearchService.search(query.searchQuery, data, searchByKeys);
					const tableData = adapterCallback(this.getPagedObject(searchResults, numOfRecords, recordsToSkip));
					return {
						...tableData,
						TotalResults: searchResults.length
					};
				}
				const tableData = adapterCallback(this.getPagedObject(data, numOfRecords, recordsToSkip));
				return {
					...tableData,
					TotalResults: data.length
				};
			})
			.catch(this.getHistoryObjError);
	}

	getTestHistoryDrilldown = (numOfRecords, pageNum, searchData, adapterCallback) => {
		return this.getDataObject('test-details.json', numOfRecords, pageNum, searchData, adapterCallback);
	}

	getAtfDetails = (numOfRecords, recordsToSkip, searchData, adapterCallback) => {
		return this.getDataObject('atf-details.json', numOfRecords, recordsToSkip, searchData, adapterCallback);
	}

	getPaymentReceiptDetails = (numOfRecords, pageNum, searchData, adapterCallback) => {
		return this.getDataObject('payment-receipt.json', numOfRecords, pageNum, searchData, adapterCallback);
	}

	getHealthAndSafetyDetails = (numOfRecords, pageNum, searchData, adapterCallback) => {
		return this.getDataObject('health-and-safety-details.json', numOfRecords, pageNum, searchData, adapterCallback);
	}

	getRecentAccountActivityDetails = (numOfRecords, pageNum, searchData, adapterCallback) => {
		return this.getDataObject('recent-account-activity.json', numOfRecords, pageNum, searchData, adapterCallback);
	}

	getAccountHistory = (numOfRecords, pageNum, searchData, adapterCallback) => {
		return this.getDataObject('account-history.json', numOfRecords, pageNum, searchData, adapterCallback);
	}

	static AllRecords = () => {
		return Number.MAX_SAFE_INTEGER;
	}

	getHistoryObjError = (err) => {
		throw err;
	}
}
