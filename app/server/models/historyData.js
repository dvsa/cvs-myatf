export default class {

	constructor(searchData, searchResults) {
		this.SearchData = searchData;
		this.GridData = {
			Headings: searchResults.Headings,
			Results: searchResults.Results,
			TotalResults: searchResults.TotalResults
		};
	}

}
