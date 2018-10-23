'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.downloadSummary = exports.downloadDetail = undefined;

var _convertJsonToCsv = require('../services/convertJsonToCsv');

var _convertJsonToCsv2 = _interopRequireDefault(_convertJsonToCsv);

var _getURI = require('../helpers/getURI');

var _getURI2 = _interopRequireDefault(_getURI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadDetail = exports.downloadDetail = (req, res) => {
	const uri = (0, _getURI2.default)('account-history.json');

	(0, _convertJsonToCsv2.default)(uri, (err, data) => {
		if (err) {
			throw Error(err);
		}

		res.attachment('download-detail.csv');
		res.send(data);
	});
};

const downloadSummary = exports.downloadSummary = (req, res) => {
	const uri = (0, _getURI2.default)('account-history.json');

	(0, _convertJsonToCsv2.default)(uri, (err, data) => {
		if (err) {
			throw Error(err);
		}

		res.attachment('download-summary.csv');
		res.send(data);
	});
};