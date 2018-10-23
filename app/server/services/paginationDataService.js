import paginate from 'express-paginate';

import PaginationData from '../models/paginationData';
import ConfigService from '../services/configService';

const { paginationLinkCount } = ConfigService.GetPaginationSettings();

export default class PaginationDataService {

	generate = (req, totalResults, searchResults) => {
		const resultsPerPage = req.query.limit;
		const pageCount = this.getPageCount(totalResults, resultsPerPage);
		const pages = this.getPages(req, pageCount);
		const pageNum = req.query.page;
		const showingResultsStartIndex = this.getShowingResultsStartIndex(pageNum, resultsPerPage);
		const showingResultsEndIndex = this.getShowingResultsEndIndex(pageNum, resultsPerPage, pageCount, totalResults);
		const paginationData = new PaginationData({
			searchResults,
			totalResults,
			pageCount,
			resultsPerPage,
			pageNum,
			showingResultsStartIndex,
			showingResultsEndIndex,
			pages
		});
		return paginationData;
	}

	getShowingResultsEndIndex = (pageNum, resultsPerPage, pageCount, totalResults) => {
		return pageCount === pageNum ? totalResults : (pageNum * resultsPerPage);
	}

	getShowingResultsStartIndex = (pageNum, resultsPerPage) => {
		return ((pageNum - 1) * resultsPerPage) + 1;
	}

	getPages = (req, pageCount) => {
		return paginate.getArrayPages(req)(paginationLinkCount, pageCount, req.query.page);
	}

	getPageCount = (totalResults, limit) => {
		return Math.ceil(totalResults / limit);
	}

}
