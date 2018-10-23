import GridDefinition from '../models/gridDefinition';
import GridHeading from '../models/gridHeading';
import GridRowItem from '../models/gridRowItem';

export default class TestDetailsAdapter {
	static formatCurrency = (val) => {
		let retVal = '';
		if (val) {
			retVal = `£${val.toLocaleString()}`;
		}
		return retVal;
	}

	static Process = (searchResults) => {
		const headings = [
			new GridHeading('Activity', 'bold'),
			new GridHeading('Start and end time', 'bold'),
			new GridHeading('Fee', 'bold numeric'),
			new GridHeading('VAT', 'bold numeric '),
			new GridHeading('Total fees', 'bold numeric'),
			new GridHeading('Details', 'bold')
		];

		const rows = searchResults.map((val) => {
			let classes = '';
			if (val.startEndTime === '') {
				classes = 'bold';
			}
			return [
				new GridRowItem(val.activity, classes),
				new GridRowItem(val.startEndTime),

				new GridRowItem(TestDetailsAdapter.formatCurrency(val.fee), 'numeric'),
				new GridRowItem(TestDetailsAdapter.formatCurrency(val.vat), 'numeric'),
				new GridRowItem(TestDetailsAdapter.formatCurrency(val.totalFees), 'numeric'),
				(val.details === 'Download certificate')
					? new GridRowItem(val.details, '', '#')
					: new GridRowItem(val.details)
			];
		});

		return new GridDefinition(headings, rows);
	};
}
