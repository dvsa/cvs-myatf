import jsonToCsvService from '../services/convertJsonToCsv';
import getUri from '../helpers/getURI';

export const downloadDetail = (req, res) => {
	const uri = getUri('account-history.json');

	jsonToCsvService(uri, (err, data) => {
		if (err) {
			throw Error(err);
		}

		res.attachment('download-detail.csv');
		res.send(data);
	});
};

export const downloadSummary = (req, res) => {
	const uri = getUri('account-history.json');

	jsonToCsvService(uri, (err, data) => {
		if (err) {
			throw Error(err);
		}

		res.attachment('download-summary.csv');
		res.send(data);
	});
};
