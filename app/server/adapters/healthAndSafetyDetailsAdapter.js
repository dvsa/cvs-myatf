import GridDefinition from '../models/gridDefinition';
import GridHeading from '../models/gridHeading';
import GridRowItem from '../models/gridRowItem';

export default class HealthAndSafetyDetailsAdapter {
	static Process = (searchResults) => {
		const headings = [
			new GridHeading('Reason', 'bold'),
			new GridHeading('Details', 'bold'),
			new GridHeading('Attachment', 'bold'),
			new GridHeading('Resolved', 'bold'),
		];

		const rows = searchResults.map((val) => {
			return [
				new GridRowItem(val.reason),
				new GridRowItem(val.details),
				new GridRowItem(val.attachment),
				new GridRowItem(val.resolved),
			];
		});

		return new GridDefinition(headings, rows);
	};
}
