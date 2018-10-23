'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _convertJsonToCsv = require('../services/convertJsonToCsv');

var _convertJsonToCsv2 = _interopRequireDefault(_convertJsonToCsv);

var _getURI = require('../helpers/getURI');

var _getURI2 = _interopRequireDefault(_getURI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, res) => {
	const uri = (0, _getURI2.default)('test-history.json');

	(0, _convertJsonToCsv2.default)(uri, (err, data) => {
		if (err) {
			throw Error(err);
		}

		res.attachment('download.csv');
		res.send(data);
	});
};

module.exports = exports['default'];