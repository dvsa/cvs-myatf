'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('data service', () => {
	const dataService = new _data2.default();

	describe('pagingJsonArray', () => {
		const standardHistoryJson = JSON.parse('[{"dateAndTime": "10 June 2017,\\n09:30 - 13:00","testPeriodLength": "3 1/2 hours","vsasBooked": "1","totalFee": "£XXX"},{"dateAndTime": "11 June 2017,\\n09:30 - 13:00","testPeriodLength": "3 1/2 hours","vsasBooked": "1","totalFee": "£XXX"},{"dateAndTime": "12 June 2017,\\n09:30 - 13:00","testPeriodLength": "3 1/2 hours","vsasBooked": "1","totalFee": "£XXX"},{"dateAndTime": "13 June 2017,\\n09:30 - 13:00","testPeriodLength": "3 1/2 hours","vsasBooked": "1","totalFee": "£XXX"}]');

		describe('when there is no data', () => {
			const emptyHistoryJson = JSON.parse('[{}]');

			it('should return an empty object', done => {
				const dataObj = dataService.getPagedObject(emptyHistoryJson, 5, 0, {});

				(0, _expect2.default)(JSON.stringify(dataObj)).toBe('[{}]');
				done();
			});
		});

		describe('when I provide data', () => {
			it('should return the correct number of results', done => {
				const numberOfResults = 3;
				const dataObj = dataService.getPagedObject(standardHistoryJson, numberOfResults, 0, {});

				(0, _expect2.default)(dataObj.length).toBe(numberOfResults);
				done();
			});

			it('should return the maximum number of records given', done => {
				const currentResults = standardHistoryJson.length;
				const dataObj = dataService.getPagedObject(standardHistoryJson, currentResults + 5, 0, {});

				(0, _expect2.default)(dataObj.length).toBe(currentResults);
				done();
			});

			it('should return the second page', done => {
				const currentResults = standardHistoryJson.length;
				const pageSize = currentResults / 2 + 1;
				const expectedSecondPageSize = currentResults - pageSize;

				const dataObj = dataService.getPagedObject(standardHistoryJson, pageSize, 3, {});

				(0, _expect2.default)(dataObj.length).toBe(expectedSecondPageSize);
				done();
			});
		});
	});
});