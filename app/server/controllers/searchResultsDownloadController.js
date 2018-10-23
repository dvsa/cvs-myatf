import jsonToCsvService from '../services/convertJsonToCsv';
import getUri from '../helpers/getURI';

export default (req, res) => {
	const uri = getUri('test-history.json');

	jsonToCsvService(uri, (err, data) => {
		if (err) {
			throw Error(err);
		}

		res.attachment('download.csv');
		res.send(data);
	});
};
