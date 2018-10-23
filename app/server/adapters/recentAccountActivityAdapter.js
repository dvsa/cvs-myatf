import GridDefinition from '../models/gridDefinition';
import GridHeading from '../models/gridHeading';
import GridRowItem from '../models/gridRowItem';

export default class RecentAccountActivityAdapter {
	static Process = (searchResults) => {
		const headings = [
			new GridHeading('Activity', 'bold'),
			new GridHeading('Start and end time', 'bold'),
			new GridHeading('Total fees', 'bold')
		];

		const rows = searchResults.map((val) => {
			const showPound = val.fees ? '£' : '';
			const newlines = val.activityDescription ? '\n\n' : '';
			return [
				new GridRowItem(`${val.activityId}${newlines}${val.activityDescription}`, val.startEndTime ? '' : 'bold'),
				new GridRowItem(val.startEndTime),
				new GridRowItem(`${showPound}${val.fees}`)
			];
		});

		return new GridDefinition(headings, rows);
	}
}
