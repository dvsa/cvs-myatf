import GridDefinition from '../models/gridDefinition';
import GridHeading from '../models/gridHeading';
import GridRowItem from '../models/gridRowItem';

export default class AccountHistoryAdapter {
	static Process = (searchResults) => {
		const headings = [
			new GridHeading('Date', 'bold'),
			new GridHeading('Invoice / Receipt', 'bold'),
			new GridHeading('Amount', 'bold numeric'),
			new GridHeading('Vat', 'bold numeric'),
			new GridHeading('Total', 'bold numeric')
		];

		const rows = searchResults.map((val) => {
			const total = val.amount - val.vat;
			return [
				new GridRowItem(val.date),
				new GridRowItem(
					AccountHistoryAdapter.toFurtherDetailsString(val.type, val.document_id),
					'',
					AccountHistoryAdapter.toFurtherDetailsUrl(val.type) // TODO can pass ID to generate correct URL here
				),
				new GridRowItem(AccountHistoryAdapter.toPlusMinusCurrency(val.amount), 'numeric'),
				new GridRowItem(AccountHistoryAdapter.toCurrency(val.vat), 'numeric'),
				new GridRowItem(AccountHistoryAdapter.toPlusMinusCurrency(total), 'numeric'),
			];
		});

		return new GridDefinition(headings, rows);
	}

	static toPlusMinusCurrency = (amount) => {
		const formattedAmount = AccountHistoryAdapter.toCurrency(amount);

		return amount < 0 ? `-${formattedAmount}` : `+${formattedAmount}`;
	}

	static toCurrency = (amount) => {
		return `£${Math.abs(amount).toFixed(2).toLocaleString()}`;
	}

	static toFurtherDetailsString = (type, id) => {
		if (type === 'testing') {
			return `Vehicle testing - ${id}`;
		}

		if (type === 'top-up') {
			return `Account top up - ${id}`;
		}

		throw new Error(`Unknown type "${type}" in account history data`);
	}

	static toFurtherDetailsUrl = (type) => {
		if (type === 'testing') {
			return '/prototype/test-details';
		}

		if (type === 'top-up') {
			return '/prototype/payment-receipt';
		}

		throw new Error(`Unknown type "${type}" in account history data`);
	}
}
