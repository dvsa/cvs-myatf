import Json2Csv from 'json2csv';
import fs from 'fs';
import request from 'request';
import isUrl from './../helpers/isUrl';

// Opens the file, disk or url based
export default (jsonFile, callback) => {
	if (isUrl(jsonFile)) {
		request.get(jsonFile, (requestErr, response, body) => {
			if (!requestErr && response.statusCode === 200) {
				callback(null, Json2Csv({ data: JSON.parse(body) }));
			} else {
				callback(requestErr);
			}
		});
	} else {
		fs.readFile(jsonFile, 'utf-8', (fileErr, contents) => {
			if (fileErr) {
				callback(fileErr);
			} else {
				const csv = Json2Csv({ data: JSON.parse(contents) });
				callback(null, csv);
			}
		});
	}
};
