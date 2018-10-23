'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFilePromise = _bluebird2.default.promisify(_fs.readFile);

exports.default = fileName => {
	return readFilePromise(fileName);
};

module.exports = exports['default'];