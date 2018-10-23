'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestPromise = _bluebird2.default.promisify(_request2.default);

exports.default = url => {
	return requestPromise(url);
};

module.exports = exports['default'];