import expect from 'expect';
import sinon from 'sinon';

import PaginationDataService from './paginationDataService';
import PaginationData from '../models/paginationData';

const mockReq = {
	query: {
		limit: 10,
		page: 1
	}
};

let paginationDataService;

describe('pagination data service', () => {

	beforeEach(() => {
		paginationDataService = new PaginationDataService();
	});

	describe('when generate is called', () => {
		it('should call relevant class methods', (done) => {
			sinon.stub(paginationDataService, 'getPageCount').callsFake(req => req);
			sinon.stub(paginationDataService, 'getPages').callsFake(req => req);
			sinon.stub(paginationDataService, 'getShowingResultsStartIndex').callsFake(req => req);
			sinon.stub(paginationDataService, 'getShowingResultsEndIndex').callsFake(req => req);
			paginationDataService.generate(mockReq, 15, []);
			expect(paginationDataService.getPageCount.calledOnce).toBe(true);
			expect(paginationDataService.getPages.calledOnce).toBe(true);
			expect(paginationDataService.getShowingResultsStartIndex.calledOnce).toBe(true);
			expect(paginationDataService.getShowingResultsEndIndex.calledOnce).toBe(true);
			done();
		});
		it('should return an instance of the PaginationData model', (done) => {
			sinon.stub(paginationDataService, 'getPages').callsFake(req => req);
			const paginationData = paginationDataService.generate(mockReq, 15, []);
			expect(paginationData instanceof PaginationData).toBe(true);
			done();
		});
	});

	describe('when getPageCount is called with different values', () => {
		it('should return the correct value', (done) => {
			const pageCount1 = paginationDataService.getPageCount(15, 10);
			const pageCount2 = paginationDataService.getPageCount(5, 10);
			const pageCount3 = paginationDataService.getPageCount(45, 20);
			const pageCount4 = paginationDataService.getPageCount(45, 10);
			const pageCount5 = paginationDataService.getPageCount(20, 5);
			expect(pageCount1).toEqual(2);
			expect(pageCount2).toEqual(1);
			expect(pageCount3).toEqual(3);
			expect(pageCount4).toEqual(5);
			expect(pageCount5).toEqual(4);
			done();
		});
	});

	describe('when getShowingResultsStartIndex is called with different values', () => {
		it('should return the correct value', (done) => {
			const ShowingResultsStartIndex1 = paginationDataService.getShowingResultsStartIndex(1, 10);
			const ShowingResultsStartIndex2 = paginationDataService.getShowingResultsStartIndex(2, 10);
			const ShowingResultsStartIndex3 = paginationDataService.getShowingResultsStartIndex(5, 10);
			const ShowingResultsStartIndex4 = paginationDataService.getShowingResultsStartIndex(4, 20);
			const ShowingResultsStartIndex5 = paginationDataService.getShowingResultsStartIndex(2, 5);
			expect(ShowingResultsStartIndex1).toEqual(1);
			expect(ShowingResultsStartIndex2).toEqual(11);
			expect(ShowingResultsStartIndex3).toEqual(41);
			expect(ShowingResultsStartIndex4).toEqual(61);
			expect(ShowingResultsStartIndex5).toEqual(6);
			done();
		});
	});

});
