import expect from 'expect';
import DataService from './data';

describe('data service', () => {
	const dataService = new DataService();

	describe('pagingJsonArray', () => {
		const standardHistoryJson = JSON.parse('[{"dateAndTime": "10 June 2017,\\n09:30 - 13:00","testPeriodLength": "3 1/2 hours","vsasBooked": "1","totalFee": "£XXX"},{"dateAndTime": "11 June 2017,\\n09:30 - 13:00","testPeriodLength": "3 1/2 hours","vsasBooked": "1","totalFee": "£XXX"},{"dateAndTime": "12 June 2017,\\n09:30 - 13:00","testPeriodLength": "3 1/2 hours","vsasBooked": "1","totalFee": "£XXX"},{"dateAndTime": "13 June 2017,\\n09:30 - 13:00","testPeriodLength": "3 1/2 hours","vsasBooked": "1","totalFee": "£XXX"}]');

		describe('when there is no data', () => {
			const emptyHistoryJson = JSON.parse('[{}]');

			it('should return an empty object', (done) => {
				const dataObj = dataService.getPagedObject(emptyHistoryJson, 5, 0, {});

				expect(JSON.stringify(dataObj)).toBe('[{}]');
				done();
			});
		});

		describe('when I provide data', () => {
			it('should return the correct number of results', (done) => {
				const numberOfResults = 3;
				const dataObj = dataService.getPagedObject(standardHistoryJson, numberOfResults, 0, {});

				expect(dataObj.length).toBe(numberOfResults);
				done();
			});

			it('should return the maximum number of records given', (done) => {
				const currentResults = standardHistoryJson.length;
				const dataObj = dataService.getPagedObject(standardHistoryJson, currentResults + 5, 0, {});

				expect(dataObj.length).toBe(currentResults);
				done();
			});

			it('should return the second page', (done) => {
				const currentResults = standardHistoryJson.length;
				const pageSize = (currentResults / 2) + 1;
				const expectedSecondPageSize = currentResults - pageSize;

				const dataObj = dataService.getPagedObject(standardHistoryJson, pageSize, 3, {});

				expect(dataObj.length).toBe(expectedSecondPageSize);
				done();
			});
		});
	});
});

