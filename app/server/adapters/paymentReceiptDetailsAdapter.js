import GridDefinition from '../models/gridDefinition';
import GridRowItem from '../models/gridRowItem';

export default class PaymentReceiptDetailsAdapter {
	static Process = (searchResults) => {
		const headings = [];
		const rows = searchResults.map((val) => {
			let classes = '';
			if (val.recordValue === '') {
				classes = 'bold heading-large';
			}

			return [
				new GridRowItem(val.recordName, classes),
				new GridRowItem(val.recordValue)
			];
		});

		return new GridDefinition(headings, rows);
	}
}
