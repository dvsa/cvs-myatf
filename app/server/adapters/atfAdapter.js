import GetBalanceCategory from '../helpers/balanceCategoryHelper';

export default class AtfAdapter {
	static Process = (searchResults) => {
		const rows = searchResults.map((val) => {
			return {
				atfAccountNumber: val.AtfAccountNumber,
				atfAccountName: val.AtfAccountName,
				atfAddress: val.AtfAddress,
				atfBalance: val.AtfBalance,
				atfBalanceString: val.AtfBalance.toLocaleString(),
				atfBalanceCategory: GetBalanceCategory(val.AtfBalance)
			};
		});
		return { data: rows };
	};
}
