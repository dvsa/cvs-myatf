'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loadFromUrl = require('./loadFromUrl');

var _loadFromUrl2 = _interopRequireDefault(_loadFromUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = url => {
	return (0, _loadFromUrl2.default)(url).then(res => {
		const parsedData = JSON.parse(res.body);
		return parsedData;
	});
};

module.exports = exports['default'];