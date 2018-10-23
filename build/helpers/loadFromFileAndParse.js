'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loadFromFile = require('./loadFromFile');

var _loadFromFile2 = _interopRequireDefault(_loadFromFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = file => {
	return (0, _loadFromFile2.default)(file).then(data => {
		const parsedData = JSON.parse(data);
		return parsedData;
	});
};

module.exports = exports['default'];