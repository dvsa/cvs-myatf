export default class SearchFormData {

	constructor(data) {
		const {
			showDownload,
			path,
			searchTypes,
			useDateFields,
			inputData,
		} = data;
		this.path = path;
		this.showDownload = showDownload;
		this.useDateFields = useDateFields;
		this.searchTypes = searchTypes;
		this.inputData = inputData || null;
	}

}

