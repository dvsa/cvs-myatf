'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _paginationDataService = require('./paginationDataService');

var _paginationDataService2 = _interopRequireDefault(_paginationDataService);

var _paginationData = require('../models/paginationData');

var _paginationData2 = _interopRequireDefault(_paginationData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mockReq = {
	query: {
		limit: 10,
		page: 1
	}
};

let paginationDataService;

describe('pagination data service', () => {

	beforeEach(() => {
		paginationDataService = new _paginationDataService2.default();
	});

	describe('when generate is called', () => {
		it('should call relevant class methods', done => {
			_sinon2.default.stub(paginationDataService, 'getPageCount').callsFake(req => req);
			_sinon2.default.stub(paginationDataService, 'getPages').callsFake(req => req);
			_sinon2.default.stub(paginationDataService, 'getShowingResultsStartIndex').callsFake(req => req);
			_sinon2.default.stub(paginationDataService, 'getShowingResultsEndIndex').callsFake(req => req);
			paginationDataService.generate(mockReq, 15, []);
			(0, _expect2.default)(paginationDataService.getPageCount.calledOnce).toBe(true);
			(0, _expect2.default)(paginationDataService.getPages.calledOnce).toBe(true);
			(0, _expect2.default)(paginationDataService.getShowingResultsStartIndex.calledOnce).toBe(true);
			(0, _expect2.default)(paginationDataService.getShowingResultsEndIndex.calledOnce).toBe(true);
			done();
		});
		it('should return an instance of the PaginationData model', done => {
			_sinon2.default.stub(paginationDataService, 'getPages').callsFake(req => req);
			const paginationData = paginationDataService.generate(mockReq, 15, []);
			(0, _expect2.default)(paginationData instanceof _paginationData2.default).toBe(true);
			done();
		});
	});

	describe('when getPageCount is called with different values', () => {
		it('should return the correct value', done => {
			const pageCount1 = paginationDataService.getPageCount(15, 10);
			const pageCount2 = paginationDataService.getPageCount(5, 10);
			const pageCount3 = paginationDataService.getPageCount(45, 20);
			const pageCount4 = paginationDataService.getPageCount(45, 10);
			const pageCount5 = paginationDataService.getPageCount(20, 5);
			(0, _expect2.default)(pageCount1).toEqual(2);
			(0, _expect2.default)(pageCount2).toEqual(1);
			(0, _expect2.default)(pageCount3).toEqual(3);
			(0, _expect2.default)(pageCount4).toEqual(5);
			(0, _expect2.default)(pageCount5).toEqual(4);
			done();
		});
	});

	describe('when getShowingResultsStartIndex is called with different values', () => {
		it('should return the correct value', done => {
			const ShowingResultsStartIndex1 = paginationDataService.getShowingResultsStartIndex(1, 10);
			const ShowingResultsStartIndex2 = paginationDataService.getShowingResultsStartIndex(2, 10);
			const ShowingResultsStartIndex3 = paginationDataService.getShowingResultsStartIndex(5, 10);
			const ShowingResultsStartIndex4 = paginationDataService.getShowingResultsStartIndex(4, 20);
			const ShowingResultsStartIndex5 = paginationDataService.getShowingResultsStartIndex(2, 5);
			(0, _expect2.default)(ShowingResultsStartIndex1).toEqual(1);
			(0, _expect2.default)(ShowingResultsStartIndex2).toEqual(11);
			(0, _expect2.default)(ShowingResultsStartIndex3).toEqual(41);
			(0, _expect2.default)(ShowingResultsStartIndex4).toEqual(61);
			(0, _expect2.default)(ShowingResultsStartIndex5).toEqual(6);
			done();
		});
	});
});