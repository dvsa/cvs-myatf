'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _json2csv = require('json2csv');

var _json2csv2 = _interopRequireDefault(_json2csv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _isUrl = require('./../helpers/isUrl');

var _isUrl2 = _interopRequireDefault(_isUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Opens the file, disk or url based
exports.default = (jsonFile, callback) => {
	if ((0, _isUrl2.default)(jsonFile)) {
		_request2.default.get(jsonFile, (requestErr, response, body) => {
			if (!requestErr && response.statusCode === 200) {
				callback(null, (0, _json2csv2.default)({ data: JSON.parse(body) }));
			} else {
				callback(requestErr);
			}
		});
	} else {
		_fs2.default.readFile(jsonFile, 'utf-8', (fileErr, contents) => {
			if (fileErr) {
				callback(fileErr);
			} else {
				const csv = (0, _json2csv2.default)({ data: JSON.parse(contents) });
				callback(null, csv);
			}
		});
	}
};

module.exports = exports['default'];